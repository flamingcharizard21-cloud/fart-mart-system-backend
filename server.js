const app = require("./index.js");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
app.listen(process.env.PORT_NO, () => {
  console.log(`Server is running in port ${process.env.PORT_NO}`);
});
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
console.log(process.env.PORT_NO);
const cors = require("cors");
app.use(cors());
