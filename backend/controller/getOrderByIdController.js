const Order = require("../model/Order");

const getOrdersByRoleController = async (req, res) => {
  const { role, roleId } = req.body; // Extracting role and roleId from the request body

  if (!role || !roleId) {
    return res.status(400).json({
      message: "Role and roleId are required fields",
    });
  }

  try {
    // Building the dynamic query based on the role
    const filter = {};
    filter[role + "Id"] = roleId;

    const orders = await Order.find(filter)
      .populate(`${role}Id items.itemId`) // Populate dynamically based on the role
      .exec();

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
