import express from 'express'
import { addProductToCart, getUserCart, updateToCart } from '../controllers/cartController.js'
import authUser from '../middlewares/Auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser , addProductToCart)
cartRouter.post('/get',authUser, getUserCart)
cartRouter.post('/update',authUser, updateToCart)

export default cartRouter;