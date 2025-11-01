import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import v1Routes from "./routes/v1/index.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import corsOptions from "./config/cors.js";
import { healthCheck } from "./controllers/healthController.js";


import "./models/Cart.js";
import "./models/CartItem.js";
import "./models/Category.js";
import "./models/Color.js";
import "./models/Feedback.js";
import "./models/News.js";
import "./models/Order.js";
import "./models/OrderItem.js";
import "./models/Product.js";
import "./models/ProductNews.js";
import "./models/User.js";

dotenv.config();

const app = express();


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => {
    console.error("❌ MongoDB error:", err);
    process.exit(1); // Thoát nếu không kết nối được DB
  });


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Watch Store E-commerce API",
    version: "1.0.0",
    endpoints: {
      products: "/api/v1/products",
      users: "/api/v1/users",
      cart: "/api/v1/cart",
      orders: "/api/v1/orders"
    }
  });
});

// Health check endpoint for monitoring
app.get("/health", healthCheck);


app.use("/api/v1", v1Routes);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API Endpoint: http://localhost:${PORT}`);
});

