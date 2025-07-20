import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        // const token = req.headers;
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.json({success: false, message: 'No token, authorization denied'})
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: 'Invalid token, authorization denied'})
        }
next()

    } catch (error) {
     console.log(error)   
     res.json({success: false, message: error.message})
    }
}

export default adminAuth;
// import jwt from 'jsonwebtoken';

// const adminAuth = (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(" ")[1];

//         if (!token) {
//             return res.json({ success: false, message: 'No token, authorization denied' });
//         }

//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
//         // Assuming you want to check if the user is an admin, you can add your logic here
//         // For example, you might want to check the role of the user in the decoded token
//         // if (tokenDecode.role !== 'admin') {
//         //     return res.json({ success: false, message: 'Not authorized as admin' });
//         // }

//         next(); // Call next() if the token is valid
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// export default adminAuth;
