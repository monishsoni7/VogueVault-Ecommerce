import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = () => {
  const [list, setlist] = useState([]);

  const fetchList = async () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    try {
      const url = backendUrl + "/api/product/list";

      console.log("Fetching from URL:", url);
      console.log("Backend URL:", backendUrl);

      const response = await axios.get(url, {
          headers: {
              Authorization: `Bearer ${token}` // Include the token in the request headers
          }
      });

      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the request headers
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2 ">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* product list  */}
        {
          list.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border gap-2 text-sm ">
                {console.log("Product Data:", item)}  {/* Log the entire product data */}
                <img className="w-12 " src={item.image && item.image.length > 0 ? item.image[0] : 'https://via.placeholder.com/150'} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>$ {item.price}</p>
                <p className="text-right cursor-pointer text-lg md:text-center" onClick={() => removeProduct(item._id)}>X</p>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default List;
