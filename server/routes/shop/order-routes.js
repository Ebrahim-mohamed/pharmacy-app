const express = require("express");

const {
  createOrder,
  getAllOrdersByUser,
  getOrderDetails,
  confirmOrder, // updated from capturePayment
} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post("/create", createOrder); // Route for creating an order
router.post("/confirm", confirmOrder); // Route for confirming an order
router.get("/list/:userId", getAllOrdersByUser); // Route for getting all orders of a user
router.get("/details/:id", getOrderDetails); // Route for getting order details

module.exports = router;
