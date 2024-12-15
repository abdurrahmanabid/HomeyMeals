const express = require("express");
const makeAOrderController = require("../controller/makeAOrderController");
const updateOrderController = require("../controller/updateOrderController");
const deleteOrderController = require("../controller/deleteOrderController");
const getOrdersByIdController = require("../controller/getOrderByIdController");
const getAllOrdersController = require("../controller/getAllOrdersController");

const router = express.Router();

// Order routes
router.post("/order-item", makeAOrderController);
router.put("/update-order/:orderId", updateOrderController);
router.delete("/delete-order/:orderId", deleteOrderController);
router.get("/get-order", getOrdersByIdController);
router.get("/get-all-order", getAllOrdersController);

module.exports = router;

// ! get er khetre {
//   "role": "rider", or "student" or "seller"
//   "roleId": "605c72ef1532073b3880d8a4"
// }
