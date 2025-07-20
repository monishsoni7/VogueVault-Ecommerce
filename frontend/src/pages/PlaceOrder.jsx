import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { shopContext } from "../context/shopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setcartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(shopContext);

  const [method, setmethod] = useState("cod");
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const onChangeHandeler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData((data) => ({ ...data, [name]: value }));
  };

  const onSumitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = []; // Declare orderItems once
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      console.log("Order Data:", orderData); // Debugging log

      switch (method) {
        case "cod":
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { Authorization: `Bearer ${token}` } });
          console.log(response.data);
          if (response.data.success) {
            setcartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.message);
    }
  };

  return (
    <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandeler}
            name="firstName"
            value={formData.firstName}
            placeholder="First name"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
          />
          <input
            required
            type="text"
            onChange={onChangeHandeler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last name"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
          />
        </div>
        <input
          required
          type="email"
          onChange={onChangeHandeler}
          name="email"
          value={formData.email}
          placeholder="Email address"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
        />
        <input
          required
          type="text"
          onChange={onChangeHandeler}
          name="street"
          value={formData.street}
          placeholder="Street address"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandeler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
          />
          <input
            required
            type="text"
            onChange={onChangeHandeler}
            name="state"
            value={formData.state}
            placeholder="State"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandeler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Pin Code"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
          />
          <input
            required
            onChange={onChangeHandeler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
          />
        </div>
        <input
          required
          onChange={onChangeHandeler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Phone number"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full "
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                } `}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setmethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                } `}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                } `}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              onClick={onSumitHandler}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;