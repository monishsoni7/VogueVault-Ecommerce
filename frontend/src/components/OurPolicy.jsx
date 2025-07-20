import React from 'react'
import { assets } from '../assets/assets'

const policies = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange",
    description: "30-day hassle-free return policy"
  },
  {
    icon: assets.quality_icon,
    title: "Quality Guaranteed",
    description: "Premium materials & craftsmanship"
  },
  {
    icon: assets.support_img,
    title: "24/7 Support",
    description: "Dedicated customer service team"
  }
]

const OurPolicy = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {policies.map((policy, index) => (
          <div 
            key={index}
            className="text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <img 
              src={policy.icon} 
              className="w-16 h-16 mx-auto mb-4 object-contain" 
              alt={policy.title} 
            />
            <h4 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
              {policy.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy