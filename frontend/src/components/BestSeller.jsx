import React, { useContext, useEffect } from "react";
import { shopContext } from "../context/shopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useState } from "react";

const BestSeller = () => {
  const { products } = useContext(shopContext);
  const [bestSeller, setbestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setbestSeller(bestProduct.slice(0, 5));
  }, [products]);
 
  return (
    <div className="my-10 dark:bg-gray-900">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
          Our most popular products loved by customers
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
