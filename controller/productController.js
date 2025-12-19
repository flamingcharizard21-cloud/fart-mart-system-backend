const productModel = require("./../model/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    console.log(products);
    res.status(200).json({
      status: "Success",
      length: products.length,
      timeOfHit: req.requestTimeOfHit,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ status: "Fail", message: err.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "Fail",
        message: "Not found",
      });
    }
    res.status(200).json({
      status: "success",
      timeOfHit: req.requestTimeOfHit,
      data: product,
    });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};
exports.addProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ status: "Fail", message: err.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      return res.status(404).json({
        status: "Fail",
        message: "Not found",
      });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        status: "Fail",
        message: "Not found",
      });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};
