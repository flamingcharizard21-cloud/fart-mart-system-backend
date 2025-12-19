const express = require("express");
const salesRouter = express.Router();
const salesController = require("./../controller/salesController");
salesRouter
  .route("/")
  .get(salesController.getAllSales)
  .post(salesController.addSales);
salesRouter
  .route("/:id")
  .get(salesController.getSalesById)
  .put(salesController.updateSales)
  .delete(salesController.deleteSales);
module.exports = salesRouter;
