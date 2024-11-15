import { useState } from 'react'

import './App.css'
import Home from './Component/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Card from './Component/Card/Card'

function App() {

  return (
    <>
     <Router> 
     

    <Routes>

    <Route path='/' element={    <Home/> } />
    
    <Route path='/card' element={   <Card/> } />

      
    </Routes>
  </Router>
    </>
  )
}

export default App
