const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Cannot upload image",
    });
  }
};

// add new product

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "newly Created product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot add product",
    });
  }
};

// fetch all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find();
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot fetch products",
    });
  }
};

// edit product

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    // Find the product and update it directly
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          image,
          title,
          description,
          category,
          brand,
          price,
          salePrice,
          totalStock,
        }
      },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product edited successfully",
      product: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot edit product",
    });
  }
};


// delete product

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cannot delete product",
    });
  }
};


module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
