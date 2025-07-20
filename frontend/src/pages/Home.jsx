import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Newslater from '../components/Newslater'
import { FiSun, FiMoon } from 'react-icons/fi'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') setDarkMode(true)
  }, [])

  useEffect(() => {
    // Apply theme class to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 z-50"
      >
        {darkMode ? <FiSun size={24}/> : <FiMoon size={24}/>}
      </button>
      
      <div className="dark:bg-gray-900 dark:text-gray-100">
        <Hero/>
        <LatestCollection/>
        {/* <BestSeller/> */}
        <OurPolicy/>
        <Newslater/>
      </div>
    </div>
  )
}

export default Home
