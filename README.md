# News Website

This project integrates the News API to fetch and display real-time headlines. It uses React for the frontend and Node.js for the backend to act as an intermediary between the frontend and the News API.

## Features
- Display 5+ news headlines on the homepage
- Search for specific news articles
- Display the source and publish date for each article
- Toggle "Show More / Show Less" functionality for news articles

## Technologies Used
- React.js (Frontend)
- Axios (For making API requests)
- Node.js (Backend)
- News API (For fetching the news)

## Setup Instructions

1. Clone this repository:
    ```bash
    git clone https://github.com/alaamahmoud67/news-website.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
   - Create a `.env` file and add your News API key:
     ```
     REACT_APP_API_KEY=your_news_api_key
     ```

4. Run the development server:
    ```bash
    npm start
    ```

5. Open your browser and visit `http://localhost:5175/` to see the app in action.

## Dependencies
- react
- axios
- react-router-dom
- node-cache (for backend caching)