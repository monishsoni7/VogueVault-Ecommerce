import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setsearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const [token, settoken] = useState('');

  const addToCart = async (itemID, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = {};
      cartData[itemID][size] = 1;
    }
    setcartItems(cartData);
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    // console.log("Adding to cart:", { userId, itemID, size }); // Debugging log

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { userId, itemId: itemID, size }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const updateQuantity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemID][size] = quantity;
    setcartItems(cartData);
    if(token){
      try {
        await axios.post(`${backendUrl}/api/cart/update`, {  itemId: itemID, size, quantity }, { headers: { Authorization: `Bearer ${token}` } });
      } catch (error) {
        console.log(error)
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data) {
        setproducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error(error.message);
    }
  };

const getUserCart = async (token) => {
  try {
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    const response = await axios.post(`${backendUrl}/api/cart/get`, { userId }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if(response.data.success) {
      setcartItems(response.data.cartData);
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message);
  }
}

  useEffect(() => {
    getProductData();
  }, []);
  
  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      settoken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showSearch,
    setshowSearch,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    settoken,
    setcartItems
  };

  return (
    <shopContext.Provider value={value}>
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
