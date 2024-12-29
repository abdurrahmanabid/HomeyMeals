const Order = require("../model/Order");

const updateOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const {
      status,
      items,
      deliveryAddress,
      customerNotes,
      review,
      paymentStatus,
      cancellationReason,
      rating,
      riderId,
    } = req.body;

    // Log the incoming data for debugging
    console.log("Request body:", req.body);

    // Validate status manually
    const validStatuses = [
      "pending",
      "in_progress",
      "completed",
      "canceled",
      "cancelled_by_seller",
      "accepted_by_rider",
      "cancelled_by_rider",
      "assigned_to_rider",
    ];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status: ${status}` });
    }

    // Prepare the update fields
    const updateFields = {
      ...(status && { status }),
      ...(items && { items }),
      ...(deliveryAddress && { deliveryAddress }),
      ...(customerNotes && { customerNotes }),
      ...(review && { review }),
      ...(paymentStatus && { paymentStatus }),
      ...(cancellationReason && { cancellationReason }),
      ...(rating && { rating }),
      ...(riderId && { riderId }),
    };

    // Find and update the order
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateFields, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

module.exports = updateOrderController;
