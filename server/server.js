//Server connetion
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

//express
const app = express();
app.use(cors());
//body-parser
app.use(express.json());

// To connect with MongoDb database
connectDB();

//Routes
const router = require("express").Router();
const controller = require("./controller");
app.post("/admin/register", controller.createAdmin);
app.post("/admin/login", controller.loginAdmin);
app.post("/admin/adminData", controller.adminData);
app.post("/users/create_user", controller.createUser);
app.get("/users/get_users", controller.getUsers);
app.post("/users/login_user", controller.loginUser);
app.post("/users/userData", controller.userData);
app.post("/products/create_product", controller.createProduct);
app.get("/products/get_products", controller.getProducts);
app.post("/products/edit_product", controller.editProduct);
app.get("/products/delete_product", controller.deleteProduct);
app.post("/cartItem/add_to_cart", controller.addToCart);
app.get("/cartItem/get_cart_items", controller.getCartItems);
app.get("/cartItem/get_allcart_items", controller.getAllCartItems);
app.get("/cartItem/remove_cart_item", controller.removeCartItem);
app.post("/category/add_category", controller.addCartegory);
app.get("/category/get_categories", controller.getCategories);
app.post("/newArrival/add_newArrival", controller.addNewArrival);
app.get("/newArrival/get_newArrivals", controller.getAllNewArrivals);
app.post("/wishlist/add_to_wishlist", controller.addToWishlist);
app.get("/wishlist/get_wishlist", controller.getWishlistItems);
app.post("/slider/add_slider", controller.addSlider);
app.get("/slider/get_sliders", controller.getSliderItems);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
