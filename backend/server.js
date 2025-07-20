import express from "express";
import cors from "cors";
import "dotenv/config"; // Ensure environment variables are loaded
import connectDB from "./config/mongodb.js";
import connectCloudnary from "./config/cloudnary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

// Connect DB and Cloudinary
connectDB();
connectCloudnary();

// Middleware
app.use(express.json());

// Handle invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, msg: "Invalid JSON" });
  }
  next();
});

// Enable CORS for Vercel frontend and local development
const allowedOrigins = [
    'https://vogue-vault-frontend.vercel.app',
    'https://vogue-vault-admin.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      console.log("CORS Origin:", origin);
      if (!origin || allowedOrigins.includes(origin) || (origin && origin.startsWith('http://localhost'))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Default route
app.get("/", (req, res) => res.status(200).send("Hello World"));

// Only listen when not in Vercel (for local dev)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Listening on localhost:${port}`));
}

export default app; // 👈 Required for Vercel
