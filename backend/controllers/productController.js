import productModel from "../models/productModel.js";
import {v2 as cloudinary} from 'cloudinary'

const addProduct = async (req, res) => {
try {
    const {name,price,category,subCategory,sizes,bestSeller,description,} = req.body
    const image1 =  req.files.image1 && req.files.image1[0]
    const image2 =  req.files.image2 && req.files.image2[0]
    const image3 =  req.files.image3 && req.files.image3[0]
    const image4 =  req.files.image4 && req.files.image4[0]

    const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

const imagesUrl = await Promise.all(
    images.map(async (item) => {
    let result = await cloudinary.uploader.upload(item.path,{
        resource_type:'image',
        format: 'webp',
        quality: 'auto'
    })
    return result.secure_url.replace(/\.(jpg|jpeg|png)/, '.webp')
}))

const productData={
    name,
    price: Number(price),
    category,
    subCategory,
    sizes:JSON.parse(sizes) ,
    bestSeller: bestSeller === 'true'?true : false,
    description,
    image: imagesUrl,
    date : Date.now()
}
const product = new productModel(productData)
await product.save()
    res.json({success:true, message:'product added successfully'})
} catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
}
}
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}
const singleProduct = async (req, res) => {
  
    try {
        
const {productID} = req.body
const product = await productModel.findById(productID)
res.json({success:true, product})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
    
}

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:'product deleted successfully'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export  {addProduct, listProducts, singleProduct, removeProduct}