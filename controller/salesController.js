const salesModel = require("./../model/salesModel");

exports.getAllSales = async (req, res) => {
  try {
    const sales = await salesModel.find();
    console.log(sales);
    res.status(200).json({
      status: "Success",
      length: sales.length,
      timeOfHit: req.requestTimeOfHit,
      data: sales,
    });
  } catch (err) {
    res.status(500).json({ status: "Fail", message: err.message });
  }
};
exports.getSalesById = async (req, res) => {
  try {
    const sales = await salesModel.findById(req.params.id);
    if (!sales) {
      return res.status(404).json({
        status: "Fail",
        message: "Not found",
      });
    }
    res.status(200).json({
      status: "success",
      timeOfHit: req.requestTimeOfHit,
      data: sales,
    });
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};
exports.addSales = async (req, res) => {
  try {
    const sales = await salesModel.create(req.body);
    res.status(201).json(sales);
  } catch (err) {
    res.status(500).json({ status: "Fail", message: err.message });
  }
};
exports.updateSales = async (req, res) => {
  try {
    const sales = await salesModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!sales) {
      return res.status(404).json({
        status: "Fail",
        message: "Not found",
      });
    }
    res.status(200).json(sales);
  } catch (err) {
    res.status(400).json({ status: "Fail", message: err.message });
  }
};
exports.deleteSales = async (req, res) => {
  try {
    const sales = await salesModel.findByIdAndDelete(req.params.id);
    if (!sales) {
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
