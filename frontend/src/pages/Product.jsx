import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productID } = useParams();
  const { products, currency, addToCart } = useContext(shopContext);
  const [productData, setproductData] = useState(null);
  const [image, setimage] = useState("");
  const [size, setsize] = useState('');

  const fetchProductData = () => {
    const foundProduct = products.find(item => item._id === productID);
    if (foundProduct) {
      console.log("Found Product:", foundProduct); // Debugging log
      setproductData(foundProduct);
      setimage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productID, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                onClick={() => setimage(item)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))} 
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full h-auto" alt="" />
          </div>
        </div>
        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-1"> {productData.name} </h1>
          <div className="flex items-center gap-1 mt-1">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2"> (122) </p>
          </div>
          <p className="mt-2 text-3xl font-medium"> {currency} {productData.price} </p>
          <p className="mt-2 text-gray-500 md:w-4/5"> {productData.description} </p>
          <div className="flex flex-col gap-4 my-4">
            <p className=""> Select Size </p>  
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button key={index} onClick={() => setsize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-black' : ''}`}> {item} </button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-6 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy of 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem ab recusandae, exercitationem ipsa eius temporibus reprehenderit magni nesciunt veniam eum officiis minus.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, facilis? Accusantium adipisci culpa ratione fugit?</p>
        </div>
      </div>
      {/* display related product */}
      <RelatedProduct category={productData.category} subcategory={productData.subcategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
