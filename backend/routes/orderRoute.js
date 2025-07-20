import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';
import adminAuth from '../middlewares/adminAuth.js';
import Auth from '../middlewares/Auth.js';

const orderRouter = express.Router();

// admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
// payment features
orderRouter.post('/place', Auth ,placeOrder)
orderRouter.post('/stripe', Auth ,placeOrderStripe)
orderRouter.post('/razorpay', Auth ,placeOrderRazorpay)
// User features
orderRouter.post('/userorders',Auth,userOrders)
export default orderRouter;
