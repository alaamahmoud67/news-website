import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Card() {
   // State for articles, initial data, search query, loading, and error
   const [articles, setArticles] = useState([]); // All articles from the API
   const [initialArticles, setInitialArticles] = useState([]); // Store original articles
   const [searchQuery, setSearchQuery] = useState(''); // Search query from the user
   const [isLoading, setIsLoading] = useState(false); // Loading state for data fetching
   const [visibleArticles, setVisibleArticles] = useState([]); // Articles to display based on user actions
   const [error, setError] = useState(null); // Error state for handling API request failures
   const [isShowMore, setIsShowMore] = useState(false); // State to toggle show more/less functionality

   // Your News API key
   const API_KEY = '0060f8444c8b4e8fa2098b059b26947c'; 
   // Fetch the articles on page load using the useEffect hook
   useEffect(() => {
    const fetchNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
        try {
            const response = await axios.get(url);
            setArticles(response.data.articles);
            setInitialArticles(response.data.articles); // Store the original articles
            setVisibleArticles(response.data.articles); // Set articles to be displayed initially
        } catch (err) {
            setError("There's a problem with the news. Try later.");
            console.error(err);
        }
    };

    fetchNews(); // Call the function to fetch news when the component is mounted
}, []);

// Handle input change and filter articles based on search query
const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
        fetchArticles(value);
    } else {
        setVisibleArticles(initialArticles); // Reset articles to original when search is cleared
    }
};

// Clear the search query and reset articles
const clearSearch = () => {
    setSearchQuery('');
    setVisibleArticles(initialArticles); // Reset articles to original
};

// Fetch articles based on search query
const fetchArticles = async (query) => {
    if (!query) return; // Don't fetch if query is empty
    setIsLoading(true);
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: query,
                apiKey: API_KEY,
                language: 'en',
                pageSize: 10, // Limit the results
            },
        });
        setVisibleArticles(response.data.articles); // Update displayed articles based on search
    } catch (error) {
        console.error('Error fetching articles:', error);
    } finally {
        setIsLoading(false);
    }
};

// Toggle to show more or fewer articles
const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
};

// Display error message if any error occurs while fetching data
if (error) {
    return <div>{error}</div>;
}

// Slice the array to show only 6 articles if "Show More" is not toggled
const displayedArticles = isShowMore ? visibleArticles : visibleArticles.slice(0, 6);


  return (
    <>
 
 <section className="p-4">
                <div className="container mx-auto px-3">
                    <div className="shadow-md p-4 flex flex-col lg:flex-row justify-between items-center">
                        <Link to="/">
                            <div className="font-bold text-3xl mb-4 lg:mb-0 hover:text-gray-700 hover:cursor-pointer">
                                Today's Headlines
                            </div>
                        </Link>
                        <div className="relative w-full lg:w-auto">
                            <input
                                type="text"
                                className="w-full px-6 py-3 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-teal-400 transition-all duration-300"
                                placeholder="Search for headlines..."
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute top-1/2 transform -translate-y-1/2 right-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Display the articles */}
                    <div className="mt-4">


                        {isLoading ? (
                            <p>Loading...</p> // Display loading text while fetching data
                        ) : (
                            <div className="py-5  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displayedArticles.map((article, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-300 cursor-pointer hover:border-gray-400 rounded-lg p-4 bg-white shadow-[0px_10px_20px_rgba(0,0,0,0.1),0px_8px_15px_rgba(0,0,0,0.2)] transition-shadow group"
                                    >
                                        {article.urlToImage && (
                                            <div className="overflow-hidden">
                                                <img
                                                    src={article.urlToImage}
                                                    alt={article.title}
                                                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                                />
                                            </div>
                                        )}
                                        <h2 className="font-semibold text-lg mt-2">{article.title}</h2>
                                        <p className="text-gray-600 mt-2">{article.description}</p>
                                        {/* Display source and publication date */}
                                        <div className="text-sm text-gray-900 mt-2">
                                            <p className="font-medium">Source: {article.source.name}</p>
                                            <p>Published at: {new Date(article.publishedAt).toLocaleDateString()}</p>
                                        </div>
                                        <a
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="my-4 inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
                                        >
                                            Read more
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Show More / Show Less button */}
            {visibleArticles.length > 6 && (
                <div className="text-center py-8">
                    <button
                        onClick={toggleReadMoreLess}
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-900"
                    >
                        {isShowMore ? "Show Less" : "Show More"}
                    </button>
                </div>
            )}
    </>
  )
}
