import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { shopContext } from '../context/shopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setshowSearch, showSearch, getCartCount ,navigate,token,settoken,setcartItems} = useContext(shopContext)

const logout = async () => {
  navigate("/login")
  localStorage.removeItem("token")
  settoken("")
  setcartItems({})
}

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 z-50 shadow-sm dark:shadow-gray-800">
      <div className="flex items-center justify-between py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent dark:from-rose-500 dark:to-pink-400">
            VogueVault
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex gap-8 text-gray-700 dark:text-gray-100">
          {['Home', 'About', 'Contact', 'Collection'].map((item) => (
            <li key={item}>
              <NavLink 
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => 
                  `text-sm font-medium hover:text-rose-500 transition-colors ${
                    isActive ? 'text-rose-500' : 'text-gray-700 dark:text-white'
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Icons Section */}
        <div className="flex items-center gap-6">
          <img 
            onClick={() => setshowSearch(!showSearch)}
            src={assets.search_icon} 
            className="w-5 cursor-pointer hover:opacity-80 dark:invert dark:hover:opacity-100" 
            alt="Search" 
          />
          
          <div className="relative group">
            {/* <Link to="/login"> */}
              <img 
              onClick={()=>token? null:  navigate('/login') }
                src={assets.profile_icon} 
                className="w-5 cursor-pointer hover:opacity-80 dark:invert dark:hover:opacity-100" 
                alt="Profile" 
              />
            {/* drop meno */}
{

  token &&
          <div className="absolute right-0 hidden group-hover:block pt-4">
  <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg p-4 w-40 space-y-2">
    <p className="text-sm hover:text-rose-500 cursor-pointer">My Profile</p>
    <p  onClick={()=> navigate('/orders') } className="text-sm hover:text-rose-500 cursor-pointer">Orders</p>
    <p className="text-sm hover:text-rose-500 cursor-pointer" onClick={logout} >Logout</p>
  </div>
</div>
}
          </div>

          <Link to="/cart" className="relative">
            <img 
              src={assets.cart_icon} 
              className="w-5 hover:opacity-80 dark:invert dark:hover:opacity-100" 
              alt="Cart" 
            />
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs 
              w-5 h-5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
            <img 
              onClick={() => setVisible(true)}
              src={assets.menu_icon} 
              className="w-5 cursor-pointer sm:hidden dark:invert" 
              alt="Menu" 
            />
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl dark:shadow-gray-700 
          transform ${visible ? 'translate-x-0' : 'translate-x-full'} 
          transition-transform duration-300 sm:hidden`}>
          
          <div className="p-6">
            <div 
              onClick={() => setVisible(false)}
              className="flex items-center gap-2 mb-8 cursor-pointer"
            >
              <img src={assets.dropdown_icon} className="w-4 rotate-180" alt="Close" />
              <span className="text-gray-600 dark:text-gray-300">Close</span>
            </div>

            <nav className="space-y-4">
              {['Home', 'About', 'Contact', 'Collection'].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  onClick={() => setVisible(false)}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-rose-500"
                >
                  {item}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar