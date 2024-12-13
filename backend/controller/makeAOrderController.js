const Order = require("./../model/Order");

const makeAOrderController = async (req, res) => {
  const {
    studentId,
    sellerId,
    riderId,
    items,
    deliveryAddress,
    totalPrice,
    status,
    paymentMethod,
    customerNotes,
    deliveryFee,
    paymentStatus,
  } = req.body;

  try {
    const newOrder = new Order({
      studentId,
      sellerId,
      riderId,
      items,
      deliveryAddress,
      totalPrice,
      status: status || "pending", // Default to "pending"
      paymentMethod,
      customerNotes,
      deliveryFee,
      paymentStatus,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
};
module.exports = makeAOrderController;

// ! Postman test
// {
//   "studentId": "605c72ef1532073b3880d8a2",  // ObjectId of the student
//   "sellerId": "605c72ef1532073b3880d8a3",   // ObjectId of the seller
//   "riderId": "605c72ef1532073b3880d8a4",    // ObjectId of the rider (optional)
//   "items": [
//     {
//       "itemId": "605c72ef1532073b3880d8b1",  // ObjectId of the food item
//       "quantity": 2                        // Quantity of the item
//     },
//     {
//       "itemId": "605c72ef1532073b3880d8b2",  // Another item in the order
//       "quantity": 1
//     }
//   ],
//   "deliveryAddress": {
//     "lang": 23.8103,  // Latitude of the delivery address
//     "lat": 90.4125    // Longitude of the delivery address
//   },
//   "totalPrice": 150,         // Total price of the order
//   "status": "pending",      // Order status (default is "pending")
//   "paymentMethod": "cash_on_delivery",  // Payment method
//   "customerNotes": "Please deliver before 6 PM",  // Optional customer notes
//   "deliveryFee": 10,        // Delivery fee
//   "paymentStatus": "pending"  // Payment status (default is "pending")
// }
