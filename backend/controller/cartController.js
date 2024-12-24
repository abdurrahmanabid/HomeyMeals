const Cart = require('../model/Cart');
const User = require('../model/User');
const Meal = require('../model/FoodItem');
const sharp = require('sharp');
const mongoose = require('mongoose');

class CartController {
  // Add item to cart
  async addToCart(req, res) {
    try {
      const { userId, mealId, quantity, totalPrice } = req.body;
      
      // Validate required fields
      if (!userId || !mealId || !quantity || !totalPrice) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(mealId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid userId or mealId format'
        });
      }

      // Check if item already exists in cart
      const existingCartItem = await Cart.findOne({
        user: userId,
        meal: mealId
      });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        existingCartItem.totalAmount = existingCartItem.quantity * totalPrice;
        const updatedItem = await existingCartItem.save();
        
        return res.status(200).json({
          success: true,
          message: 'Cart updated successfully',
          data: updatedItem
        });
      }

      const cartItem = new Cart({
        user: userId,
        meal: mealId,
        quantity: quantity,
        totalAmount: totalPrice
      });

      const savedCartItem = await cartItem.save();

      res.status(201).json({
        success: true,
        message: 'Item added to cart successfully',
        data: savedCartItem
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding item to cart',
        error: error.message
      });
    }
  }

  // Get cart items with populated meal and user data
  async getCartItems(req, res) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid userId format'
        });
      }

      const cartItems = await Cart.find({ user: userId })
      .populate({
        path: 'meal',
      })
      .populate({
        path: 'user',
        select: ' id fullName email phone role'
      })
      .sort({ createdAt: -1 });

    const cartTotal = cartItems.reduce((total, item) => total + item.totalAmount, 0);
    const formattedItems = await Promise.all(
        cartItems.map(async (item) => {
          const compressedImage = item.meal.image
            ? await sharp(item.meal.image.data)
                .resize(300) // Resize the image (e.g., max width 300px)
                .toBuffer()
            : null;
      
          return {
            ...item._doc,
            data: {
              total: cartTotal,
              itemCount: cartItems.length,
            },
            meal: {
              ...item.meal._doc,
              image: compressedImage
                ? `data:${item.meal.image.contentType};base64,${compressedImage.toString('base64')}`
                : null,
            },
          };
        })
      );
      
    res.status(200).json({
      success: true,
      data: formattedItems
    });

    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching cart items',
        error: error.message
      });
    }
  }

  // Get single cart item details
  async getCartItemById(req, res) {
    try {
      const { cartId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid cart item ID format'
        });
      }

      const cartItem = await Cart.findById(cartId)
        .populate({
          path: 'meal',
          select: 'name description price image category'
        })
        .populate({
          path: 'user',
          select: 'name email'
        });

      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found'
        });
      }

      res.status(200).json({
        success: true,
        data: cartItem
      });
    } catch (error) {
      console.error('Error fetching cart item:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching cart item details',
        error: error.message
      });
    }
  }

  // Get user's cart summary
  async getUserCartSummary(req, res) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid userId format'
        });
      }

      const user = await User.findById(userId).select('fullname email');
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const cartItems = await Cart.find({ user: userId })
        .populate({
          path: 'meal',
                });
              
              cartItems.forEach(item => {
                if (item.meal && item.meal.image) {
                   `data:${item.meal.image.contentType};base64,${item.meal.image.data.toString('base64')}`
                }
              });
              
              console.log(cartItems);
              
      const summary = {
        user: user,
        totalItems: cartItems.length,
        totalAmount: cartItems.reduce((sum, item) => sum + item.totalAmount, 0),
        items: cartItems
      };

      res.status(200).json({
        success: true,
        data: summary
      });
    } catch (error) {
      console.error('Error fetching user cart summary:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching cart summary',
        error: error.message
      });
    }
  }

  // Update cart item
  async updateCartItem(req, res) {
    try {
      const { cartId } = req.params;
      const { quantity, totalPrice } = req.body;

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid cart ID format'
        });
      }

      if (quantity < 1) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be at least 1'
        });
      }

      const cartItem = await Cart.findById(cartId);
      
      if (!cartItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found'
        });
      }

      cartItem.quantity = quantity;
      cartItem.totalAmount = quantity * totalPrice;
      await cartItem.save();

      res.status(200).json({
        success: true,
        message: 'Cart item updated successfully',
        data: cartItem
      });
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating cart item',
        error: error.message
      });
    }
  }

  // Remove cart item
  async removeFromCart(req, res) {
    try {
      const { cartId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(cartId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid cart ID format'
        });
      }

      const deletedItem = await Cart.findByIdAndDelete(cartId);
      
      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: 'Cart item not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Item removed from cart successfully'
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
      res.status(500).json({
        success: false,
        message: 'Error removing cart item',
        error: error.message
      });
    }
  }

  // Clear entire cart
  async clearCart(req, res) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      await Cart.deleteMany({ user: userId });

      res.status(200).json({
        success: true,
        message: 'Cart cleared successfully'
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({
        success: false,
        message: 'Error clearing cart',
        error: error.message
      });
    }
  }

  // Get cart total
  async getCartTotal(req, res) {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user ID format'
        });
      }

      const cartItems = await Cart.find({ user: userId });
      const total = cartItems.reduce((sum, item) => sum + item.totalAmount, 0);

      res.status(200).json({
        success: true,
        data: { total }
      });
    } catch (error) {
      console.error('Error calculating cart total:', error);
      res.status(500).json({
        success: false,
        message: 'Error calculating cart total',
        error: error.message
      });
    }
  }
}

module.exports = new CartController();