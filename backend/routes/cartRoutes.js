const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

// Cart Management Routes
router.post('/add', cartController.addToCart);
router.get('/user/:userId', cartController.getCartItems);
router.get('/item/:cartId', cartController.getCartItemById);
router.get('/summary/:userId' , cartController.getUserCartSummary);

// Cart Item Update/Delete Routes
router.put('/update/:cartId', cartController.updateCartItem);
router.delete('/remove/:cartId', cartController.removeFromCart);
router.delete('/clear/:userId' , cartController.clearCart);

// Cart Total Route
router.get('/total/:userId', cartController.getCartTotal);

module.exports = router;