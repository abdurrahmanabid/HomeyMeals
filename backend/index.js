const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./helper/dbConnection");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/auth");
const userGet = require("./routes/getUsers");
const itemRouter = require("./routes/item");
const profileRoutes = require("./routes/profile");
const categoryRoutes = require("./routes/category");
const orderRouter = require("./routes/orderRouter");
const notificationRouter = require("./routes/notificationRoute");
const app = express();
dbConnection();

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

app.use("/api/auth", authRoutes);
app.use("/api/get", userGet);
app.use("/api/categories", categoryRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/notification", notificationRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
