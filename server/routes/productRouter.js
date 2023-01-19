const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  deleteReview,
  getProductReviews,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(createProduct);
router
  .route("/admin/product/:id")
  .put( updateProduct);
router
  .route("/admin/product/:id")
  .delete( deleteProduct);
router.route("/product/:id").get(getProductDetails);
//reviwes
router.route("/review").put( createProductReview);

router.route("/reviews").get(getProductReviews).delete( deleteReview);
module.exports = router;
