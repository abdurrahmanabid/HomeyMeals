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

app.use("/api/auth", authRoutes);
app.use("/api/get", userGet);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
