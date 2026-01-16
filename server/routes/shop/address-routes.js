const express = require("express");
const router = express.Router();

const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress
} = require("../../controllers/shop/address-controller");


router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

module.exports = router;