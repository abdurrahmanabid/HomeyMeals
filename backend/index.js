const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./helper/dbConnection");
const profileRoutes = require("./routes/profile");

dbConnection();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./routes/auth");
const userGet = require("./routes/getUsers");
const itemRouter = require("./routes/item");
const orderRouter = require("./routes/orderRouter");

app.use("/api/auth", authRoutes);
app.use("/api/get", userGet);
app.use("/api/profile", profileRoutes);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
