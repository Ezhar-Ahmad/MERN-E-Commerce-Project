const { Schema, model } = require("mongoose");

//User Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  userName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//Admin Schema
const adminSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  userName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

//Product Schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 50,
  },
  color: {
    type: String,
    maxlength: 50,
  },
  size: {
    type: String,
    required: true,
    maxlength: 20,
  },
  categoryId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    maxlength: 20,
  },
  imageSrc: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//Cart Schema
const addToCartSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
    maxlength: 50,
  },
  productId: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 50,
  },
  color: {
    type: String,
    maxlength: 50,
  },
  size: {
    type: String,
    required: true,
    maxlength: 20,
  },
  categoryId: {
    type: String,
    required: true,
  },
  itemCount: {
    type: Number,
    maxlength: 20,
  },
  imageSrc: {
    type: String,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//Category Schema
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  itemsCount: {
    type: Number,
  },
  imageSrc: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//New_Arrivals Schema
const newArrivalSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 50,
  },
  color: {
    type: String,
    maxlength: 50,
  },
  size: {
    type: String,
    required: true,
    maxlength: 20,
  },
  categoryId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    maxlength: 20,
  },
  imageSrc: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//wishlist Schema
const wishlistSchema = new Schema({
  productTitle: {
    type: String,
    required: true,
    maxlength: 50,
  },
  productId: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: Number,
    required: true,
    maxlength: 50,
  },
  color: {
    type: String,
    maxlength: 50,
  },
  size: {
    type: String,
    required: true,
    maxlength: 20,
  },
  categoryId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  imageSrc: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

//Slider Schema
const sliderSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  imageSrc: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const userModel = model("user", userSchema);
const adminModel = model("admin", adminSchema);
const productModel = model("product", productSchema);
const addToCartModel = model("cart", addToCartSchema);
const categoryModel = model("category", categorySchema);
const newArrivalModel = model("new_arrival", newArrivalSchema);
const wishlistModel = model("wishlist", wishlistSchema);
const sliderModel = model("slider", sliderSchema);

module.exports = {
  userModel,
  adminModel,
  productModel,
  addToCartModel,
  categoryModel,
  newArrivalModel,
  wishlistModel,
  sliderModel,
};
