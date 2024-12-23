const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./helper/dbConnection");
const profileRoutes = require("./routes/profile");
const cartRoutes = require("./routes/cartRoutes");
dbConnection();

const app = express();

// Improved CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Specify your frontend's exact origin
    credentials: true, // Important for handling cookies and authentication
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(express.json({ limit: "10mb" })); // Increased JSON body limit
app.use(cookieParser());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const authRoutes = require("./routes/auth");
const userGet = require("./routes/getUsers");
const itemRouter = require("./routes/item");
const orderRouter = require("./routes/orderRouter");

app.use("/api/auth", authRoutes);
app.use("/api/get", userGet);
app.use("/api/profile", profileRoutes);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
