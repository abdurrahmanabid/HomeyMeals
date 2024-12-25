const Order = require("../model/Order");

const getOrdersByRoleController = async (req, res) => {
  const { role, roleId } = req.query; // Extracting role and roleId from query parameters

  if (!role || !roleId) {
    return res.status(400).json({
      message: "Role and roleId are required fields",
    });
  }

  try {
    // Building the dynamic query based on the role
    const filter = {};
    filter[`${role}Id`] = roleId;

    // Log the filter to debug
    console.log("Filter:", filter);

    // Query to find orders and populate relevant fields
    const orders = await Order.find(filter)
      .populate("studentId") // Populates student details
      .populate("sellerId") // Populates seller details
      .populate("riderId") // Populates rider details
      .populate("items._id"); // Populates FoodItem details for each item in the order

    // Log the populated orders to debug
    console.log("Populated Orders:", orders);

    // Send the populated orders back in the response
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching orders",
      error: err.message,
    });
  }
};

module.exports = getOrdersByRoleController;
