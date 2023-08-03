import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  productController,
  singleProductController,
  productImageController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

// router object
const router = express.Router();

// routes
// creating product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products
router.get("/get-products", productController);

// get single product
router.get("/get-products/:slug", singleProductController);

// get photo
router.get("/product-image/:pid", productImageController);

// delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

// fliters for products
router.post("/product-filters", productFilterController);

// product count
router.get("/product-count", productCountController);

//product on page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

// category wise products on single page
router.get("/product-category/:slug", productCategoryController);

// payment routes
// token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);

export default router;
