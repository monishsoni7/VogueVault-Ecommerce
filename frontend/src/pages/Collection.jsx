import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import RelatedProduct from '../components/RelatedProduct'; // Import RelatedProduct

import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products,search, showSearch } = useContext(shopContext);
  const [showFilter, setshowFilter] = useState(false);
  const [filterProduct, setfilterProduct] = useState([])
  const [category, setcategory] = useState([])
  const[subcategory, setsusubcategory] = useState([])
  const [sortType, setsortType] = useState('relavent')

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){ 
      setcategory(prev=> prev.filter(item=> item !== e.target.value))
    }else{
setcategory(prev=> [...prev, e.target.value])
    }
  }
const toggleSubCategory = (e) => {
  if(subcategory.includes(e.target.value)){
    setsusubcategory(prev=> prev.filter(item=> item !== e.target.value))
  }
  else{
    setsusubcategory(prev=> [...prev, e.target.value])
  }
}
const applyFilter = () => {
  let productsCopy =products.slice()
if(showSearch && search){
  productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
}

  if(category.length > 0){
    productsCopy = productsCopy.filter(item=> category.includes(item.category))
  } 
if(subcategory.length > 0){
  productsCopy = productsCopy.filter(item=> subcategory.includes(item.subcategory))
}


setfilterProduct(productsCopy)
}
const sortProducts = (e) => {
  let fpCopy = filterProduct.slice()
  switch(sortType){
    case "low-high":
      setfilterProduct(fpCopy.sort((a,b)=> a.price - b.price))
      break;
    case "high-low":
      setfilterProduct(fpCopy.sort((a,b)=> b.price - a.price))
      break;
    default:
      applyFilter()
      break;
  }
}

  // useEffect(() => {
  //   setfilterProduct(products) 
  // }, [])

  useEffect(() => {
    applyFilter()
  }, [category,subcategory,search,showSearch,products])
  
useEffect(() => {
  sortProducts()
},[sortType])
  

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t ">
      {/* Filter option */}
      <div className="min-w-60">
        <p onClick={() => setshowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}}`} alt="" />
        </p>

        {/* category filter */}
        <div
          className={`border border-gray-700 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light dark:text-white text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Men"} onClick={toggleCategory}   /> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Women"} onClick={toggleCategory}  />
              Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Kids"} onClick={toggleCategory}  /> Kids
            </p>
          </div>
        </div>
         {/*subcategory filter  */}
         <div
          className={`border  border-gray-700 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light dark:text-white text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Topwear"}  onClick={toggleSubCategory} /> Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Bottomwear"}  onClick={toggleSubCategory} />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={"Winterwear"}  onClick={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>
       
       {/* right side */}
          
          <div className="flex-1">
<div className="flex justify-between text-base sm:text-2xl mb-4">
<Title text1={'ALL'} text2={'COLLECTIONS'} />
{/* product sort */}
<select onChange={(e)=> setsortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
  <option value="relavent">Sort by: Relevance</option>
  <option value="low-high">Sort by: Low-High</option>
  <option value="high-low">Sort by: High-Low</option>
</select>

</div>
{/* map product */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"> 
{
  filterProduct.map((item,index)=>(
    <ProductItem key={index} name={item.name}  id={item._id} price={item.price} image={item.image} />
  ))
}
</div>
          </div>

    </div>
  );
};

export default Collection;
