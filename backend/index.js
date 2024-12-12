// require('dotenv').config();
// const express = require('express');
// const app = express();
// const dbConnection = require('./helper/dbConnection');

// // const authentication = require('./middleware/authentication');

// const registrationController = require('./controller/registrationController');
// const loginController = require('./controller/loginController');
// // const emailVerificationController = require('./controller/emailVerificationController');
// // const blogPostController = require('./controller/blogPostController');
// // const getAllBlogController = require('./controller/getAllBlogController');
// // const multer  = require('multer')
// // const path = require('path');
// // const categoryController = require('./controller/categoryController');
// // const categoryDeleteController = require('./controller/categoryDeleteController');
// // const categoryEditController = require('./controller/categoryEditController');

// app.use(express.json());
// dbConnection();
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// // const storage = multer.diskStorage({
// //     destination: function (req, file, cb) {
// //       cb(null, './uploads')
// //     },
// //     filename: function (req, file, cb) {
// //       console.log(file)
// //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
// //       cb(null, uniqueSuffix  + '-' + file.originalname)
// //     }
// //   })

// //   const upload = multer({ storage: storage })

// app.post('/registration', registrationController);
// app.post('/login', loginController);
// // app.post('/blog_post', secureApi,upload.single('avatar'), blogPostController);
// // app.post('/category', secureApi, categoryController);
// // app.post('/categoryedit', secureApi, categoryEditController);
// // app.get('/blog_post', secureApi, getAllBlogController);

// // app.get('/:email', emailVerificationController);
// // app.delete('/categorydelete/:id',secureApi,categoryDeleteController);

// app.listen(8000, () => {
//     console.log('Server is running on port 8000');
// });
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dbConnection = require("./helper/dbConnection");
const multer = require("multer");
const path = require("path");
const profileRoutes = require("./routes/profile");

dbConnection();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadDir = path.join(__dirname, "uploads");
//       cb(null, uploadDir); // Save files in 'uploads/' directory
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`); // Filename with timestamp to avoid conflicts
//     },
//   });
  
// const upload = multer({ storage }); // Multer instance with storage configuration
  
//   // Make multer available in the request object globally
// app.use((req, res, next) => {
//     req.upload = upload;
//     next();
//   });
  
  
  // Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  

const authRoutes = require("./routes/auth");
const userGet = require("./routes/getUsers");

app.use("/api/auth", authRoutes);
app.use("/api/get", userGet);
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
