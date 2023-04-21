const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`));

// Middlewares
app.use(express.json());

const patchMiddleware = (req, res, next) => {
  const id = +req.params.id;
  const fetchData = products.find((el) => el.id === id);
  if (!fetchData) {
    return res
      .status(404)
      .json({ status: "failed", message: "Product not found!" });
  } else if (fetchData.quantity < 1) {
    return res.status(404).json({
      status: "success",
      message: `${fetchData.name} , Out of stock!`,
    });
  }
  res.json({
    status: "success",
    message: `Thank you for purchasing ${fetchData.name}`,
    product: fetchData,
  });
  console.log(id);
  next();
};

// Write PATCH endpoint to buy a product for the client here
app.patch("/api/v1/products/:id", patchMiddleware);
// Endpoint /api/v1/products/:id

module.exports = app;