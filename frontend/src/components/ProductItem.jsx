import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, price, name }) => {
  const { currency } = useContext(shopContext)

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-gray-700 transition-shadow duration-300">
      {/* Structural Frame */}
      <div className="absolute inset-0 border-2 border-black/5 rounded-2xl pointer-events-none" />
      
      {/* Image Container with Dynamic Aspect Ratio */}
      <Link to={`/product/${id}`} className="block relative overflow-hidden bg-gray-50">
        <div className="relative pb-[125%]"> {/* 4:3 aspect ratio */}
          <img
            src={image[0]}
            className="absolute inset-0 w-full h-full object-cover 
              transform transition-transform duration-500 group-hover:scale-105"
            alt={name}
          />
          
          {/* Geometric Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20" />
          
          {/* Floating Price Tag */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-full 
            shadow-sm text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-300
            group-hover:-translate-y-2">
            {currency}{price}
          </div>
        </div>
      </Link>

      {/* Product Info with Hidden Details */}
      <div className="p-4 relative">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-1 mb-1">{name}</h3>
        
        {/* Interactive Rating & Actions */}
        <div className="flex justify-between items-center opacity-0 
          group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            ⭐ 4.8 (238 reviews)
          </div>
          <button className="text-gray-500 dark:text-gray-400 hover:text-rose-500 transition-colors">
            ❤
          </button>
        </div>

        {/* Hidden Color Strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
          from-rose-400 via-blue-400 to-emerald-400 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Floating Shadow Effect */}
      <div className="absolute inset-0 rounded-2xl shadow-[0_45px_65px_-15px_rgba(0,0,0,0.1)] 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
    </div>
  )
}

export default ProductItem