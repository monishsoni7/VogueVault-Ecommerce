import React from 'react'

const Newslater = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Add newsletter logic
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="space-y-4 mb-8">
          <h3 className="text-2xl sm:text-3xl font-light dark:text-white">
            Get 20% Off Your First Order
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Subscribe to our newsletter for exclusive updates and special offers
          </p>
        </div>

        <form 
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full border border-gray-300 
              dark:border-gray-600 dark:bg-gray-700 dark:text-white
              focus:outline-rose-500 text-sm sm:text-base"
            required 
          />
          <button
            type="submit"
            className="bg-rose-500 text-white px-8 py-3 rounded-full
              hover:bg-rose-600 transition-colors duration-300 text-sm sm:text-base"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}

export default Newslater