import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    // Implementation here
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({success:false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
if(isMatch){
const token = createToken(user._id);
res.json({success:true, token, user });
}
else{
    res.json({success:false, message: "Invalid credentials" });
}

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        console.log("RegisterUser called with body:", req.body);
        const { name, email, password } = req.body;
        console.log("Parsed values:", { name, email, password });
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, msg: "User already exists" });
        }
        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Invalid email format" });
        }
        if (password.length < 8) {
            return res.json({ success: false, msg: "Please enter a strong password" });
        }
        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(400).json({ success: false, msg: "Invalid request data" });
    }
}

const adminLogin = async (req, res) => {
    // Implementation here
    try {
       const { email, password } = req.body;
       if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.JWT_SECRET);
           res.json({ success: true, token});

       }else{
           res.json({ success: false, msg: "Invalid email or password" });

       }
    } catch (error) {
     console.log(error)   
     res.json({success:false,message:error.message})
    }
}

export { loginUser, registerUser, adminLogin };
