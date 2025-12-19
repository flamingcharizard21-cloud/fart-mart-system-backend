const express = require("express");
const app = express();
app.use(express.json());
const userRouter = require("./routes/userRoutes");
const salesRouter = require("./routes/salesRoutes");
const productRouter = require("./routes/productRoutes");
app.use("/api/fms/product/", productRouter);
app.use("/api/fms/user/", userRouter);
app.use("/api/fms/sales/", salesRouter);

module.exports = app;
