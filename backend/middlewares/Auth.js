import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    console.log("Incoming request headers:", req.headers); // Debugging log
    // const token = req.headers.authorization?.split(" ")[1]; // Extract the token

    
const token = req.headers.authorization?.split(" ")[1]; // Extract the token

    if(!token){
        console.log("No token found"); // Debugging log

    return res.json({success:false, message:"No token found"})
}
try {
    const token_decode= jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next()
} catch (error) {
    console.log(error);
res.json({success:false, message: error.message})
}

}
export default authUser;
