import React ,{useContext, useEffect} from 'react'
import { shopContext } from '../context/shopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const SearchBar = () => {
    const {search,setsearch,showSearch,setshowSearch} = useContext(shopContext)
    const [visible, setvisible] = useState(false)
    const location = useLocation();
    useEffect(() =>{
        if(location.pathname.includes('/collection')){
setvisible(true)
        }
        else{
            setvisible(false)
        }
    },[location])
  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center '>
<div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>

<input value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
<img src={assets.search_icon} className='w-4' alt="" />
</div>
<img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={()=> setshowSearch(false)} alt="" />
    </div>
  ): null
}

export default SearchBar