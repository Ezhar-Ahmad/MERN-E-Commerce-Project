const { userModel } = require("./models");
const { adminModel } = require("./models");
const { productModel } = require("./models");
const { addToCartModel } = require("./models");
const { categoryModel } = require("./models");
const { newArrivalModel } = require("./models");
const { wishlistModel } = require("./models");
const { sliderModel } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "sdlsdjfodjfpsdvmdvlj2o134320430ddjclvcxxlxcl";

//Register user
exports.createUser = async (req, res) => {
  const userData = await req.body;
  const email = userData.email;
  const encryptedPassword = await bcrypt.hash(userData.password, 10);
  try {
    //check if user already exists
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.send({ Error: "User already exists." });
    }
    // else {
    // get the user from the body
    userData.createdAt = Date.now();
    userData.updatedAt = Date.now();
    userData.password = encryptedPassword;
    //create a new user then save it
    await userModel
      .create(userData)
      .then((createdUser) => {
        if (!createdUser)
          return res.status(404).json({
            success: false,
            message: "User creation failed",
            error: "Unable to get created user",
          });
        res.status(201).json({
          success: true,
          createdUser,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
    //}
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Login user
exports.loginUser = async (req, res) => {
  const userData = await req.body;
  const email = userData.email;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found." });
  }
  if (await bcrypt.compare(userData.password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 3600,
    });

    if (res.status(201)) {
      return res.json({ status: "Ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid password." });
};

//Get loggedIn userData using jwt token
exports.userData = async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      } else {
        return res;
      }
    });

    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const userEmail = user.email;
    userModel
      .findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
};

//Get loggedIn adminData using jwt token
exports.adminData = async (req, res) => {
  const { token } = req.body;
  try {
    const admin = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      } else {
        return res;
      }
    });

    if (admin == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const adminEmail = admin.email;
    adminModel
      .findOne({ email: adminEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//Register admin
exports.createAdmin = async (req, res) => {
  // get the admin detail from the body
  const adminData = await req.body;
  const email = adminData.email;
  const encryptedPassword = await bcrypt.hash(adminData.password, 10);
  try {
    //check if admin already exist
    const oldAdmin = await adminModel.findOne({ email });
    if (oldAdmin) {
      return res.send({ error: "Admin already exist." });
    }

    adminData.createdAt = Date.now();
    adminData.updatedAt = Date.now();
    adminData.password = encryptedPassword;
    //create a new admin then save it
    await adminModel
      .create(adminData)
      .then((createdAdmin) => {
        if (!createdAdmin)
          return res.status(404).json({
            success: false,
            message: "Admin creation failed",
            error: "Unable to get created admin",
          });
        res.status(201).json({
          success: true,
          createdAdmin,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Login admin
exports.loginAdmin = async (req, res) => {
  const adminData = await req.body;
  const email = adminData.email;
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    return res.json({ error: "Admin not found." });
  }
  if (await bcrypt.compare(adminData.password, admin.password)) {
    const token = jwt.sign({ email: admin.email }, JWT_SECRET, {
      expiresIn: 10,
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid password." });
};

//Get all registered users
exports.getUsers = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    userModel
      .find()
      .then((allUsers) => {
        res.status(200).json({
          success: true,
          allUsers,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find users",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Create a new product
exports.createProduct = async (req, res) => {
  // get the product from the body
  const productData = await req.body;
  const title = productData.title;

  try {
    //check if admin already exist
    const oldProduct = await productModel.findOne({ title });
    if (oldProduct) {
      return res.send({ error: "Product already exist." });
    }

    productData.createdAt = Date.now();
    productData.updatedAt = Date.now();
    //create a new product then save it
    await productModel
      .create(productData)
      .then((createdProduct) => {
        if (!createdProduct)
          return res.status(404).json({
            success: false,
            message: "Product creation failed",
            error: "Unable to get created product",
          });
        res.status(201).json({
          success: true,
          createdProduct,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Get all products
exports.getProducts = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    productModel
      .find()
      .then((allProducts) => {
        res.status(200).json({
          success: true,
          allProducts,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find products",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Edit product
exports.editProduct = async (req, res) => {
  const data = await req.body;
  const productId = data.id;
  //get all the data in the model and return it as response
  try {
    const oldProduct = await productModel.findOne({ _id: productId });
    if (oldProduct) {
      oldProduct.title = data.title;
      oldProduct.description = data.description;
      oldProduct.price = data.price;
      oldProduct.color = data.color;
      oldProduct.size = data.size;
      oldProduct.categoryId = data.categoryId;
      oldProduct.quantity = data.quantity;
      oldProduct.imageSrc = data.imageSrc;
      oldProduct.updatedAt = Date.now();

      productModel
        .updateOne({ _id: productId }, { oldProduct })
        .then((editProduct) => {
          res.status(200).json({
            success: true,
            editProduct,
          });
        })
        .catch((error) => {
          res.status(404).json({
            success: false,
            message: "Cant edit product",
            error,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Delete product
exports.deleteProduct = async (req, res) => {
  let productId = req.query.productId;
  //get all the data in the model and return it as response
  try {
    productModel
      .deleteOne({ _id: productId })
      .then((removeProduct) => {
        res.status(200).json({
          success: true,
          removeProduct,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Can't delete product",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Add to Cart products
exports.addToCart = async (req, res) => {
  try {
    // get the cart item from the body
    const cartItemData = await req.body;
    cartItemData.createdAt = Date.now();
    cartItemData.updatedAt = Date.now();
    //check if already added in cart
    const productId = cartItemData.productId;
    const itemExist = await addToCartModel.findOne({ productId });
    if (itemExist) {
      return res.json({
        success: false,
        error: "Already exist in cart.",
      });
    } else {
      //create a new cart item then save it
      await addToCartModel
        .create(cartItemData)
        .then((createdCartItem) => {
          if (!createdCartItem)
            return res.status(404).json({
              success: false,
              message: "CartItem creation failed",
              error: "Unable to get created cart item",
            });
          res.status(201).json({
            success: true,
            createdCartItem,
          });
        })
        .catch((error) => {
          res.status(404).json({
            success: false,
            error: error.message,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Get Cart Items
exports.getCartItems = async (req, res) => {
  let userId = req.query.userId;
  //get all the data in the model and return it as response
  try {
    addToCartModel
      .find({ userId: userId })
      .then((allCartItems) => {
        res.status(200).json({
          success: true,
          allCartItems,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find cartItems",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Get all Cart Items
exports.getAllCartItems = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    addToCartModel
      .find()
      .then((allCartItems) => {
        res.status(200).json({
          success: true,
          allCartItems,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find cartItems",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Remove Cart Item
exports.removeCartItem = async (req, res) => {
  let productId = req.query.productId;
  //get all the data in the model and return it as response
  try {
    addToCartModel
      .deleteOne({ productId: productId })
      .then((removeCartItem) => {
        res.status(200).json({
          success: true,
          removeCartItem,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Can't find cartItem",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Add new Cartegory
exports.addCartegory = async (req, res) => {
  try {
    // get the cart item from the body
    const catogoryDetails = await req.body;
    catogoryDetails.createdAt = Date.now();
    catogoryDetails.updatedAt = Date.now();
    //create a new category then save it
    await categoryModel
      .create(catogoryDetails)
      .then((createdCategory) => {
        if (!createdCategory)
          return res.status(404).json({
            success: false,
            message: "category creation failed",
            error: "Unable to get created category",
          });
        res.status(201).json({
          success: true,
          createdCategory,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Get all Categories
exports.getCategories = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    categoryModel
      .find()
      .then((allCategories) => {
        res.status(200).json({
          success: true,
          allCategories,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find cartItems",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Add new_arrival product
exports.addNewArrival = async (req, res) => {
  try {
    // get the new_arrival product from the body
    const productDetails = await req.body;
    productDetails.createdAt = Date.now();
    productDetails.updatedAt = Date.now();
    //create a new_arrival product then save it
    await newArrivalModel
      .create(productDetails)
      .then((createdNewArrival) => {
        if (!createdNewArrival)
          return res.status(404).json({
            success: false,
            message: "newArrival creation failed",
            error: "Unable to get created newArrival",
          });
        res.status(201).json({
          success: true,
          createdNewArrival,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Get all new_arrival products
exports.getAllNewArrivals = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    newArrivalModel
      .find()
      .then((allNewArrivals) => {
        res.status(200).json({
          success: true,
          allNewArrivals,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find new arrivals",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Add product to Wishlist
exports.addToWishlist = async (req, res) => {
  try {
    // get the wishlist product from the body
    const productDetails = await req.body;
    productDetails.createdAt = Date.now();
    productDetails.updatedAt = Date.now();
    //check if product already exist
    const productId = productDetails.productId;
    const itemExist = await wishlistModel.findOne({ productId });
    if (itemExist) {
      return res.json({
        success: false,
        error: "Already exist in wishlist.",
      });
    } else {
      //Add a new product then save it
      await wishlistModel
        .create(productDetails)
        .then((addedProduct) => {
          if (!addedProduct)
            return res.status(404).json({
              success: false,
              message: "Wishlist product creation failed",
              error: "Unable to get added product to wishlist",
            });
          res.status(201).json({
            success: true,
            addedProduct,
          });
        })
        .catch((error) => {
          res.status(404).json({
            success: false,
            error: error.message,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Get all wishlist items
exports.getWishlistItems = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    wishlistModel
      .find()
      .then((allwishlistItems) => {
        res.status(200).json({
          success: true,
          allwishlistItems,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find wishlist items",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Add a slider
exports.addSlider = async (req, res) => {
  try {
    // get the slider from the body
    const sliderDetails = await req.body;
    sliderDetails.createdAt = Date.now();
    sliderDetails.updatedAt = Date.now();
    //Add a new product then save it
    await sliderModel
      .create(sliderDetails)
      .then((addedSlider) => {
        if (!addedSlider)
          return res.status(404).json({
            success: false,
            message: "Slider creation failed",
            error: "Unable to get added slider",
          });
        res.status(201).json({
          success: true,
          addedSlider,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          error: error.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Get all Slider Items
exports.getSliderItems = async (req, res) => {
  //get all the data in the model and return it as response
  try {
    sliderModel
      .find()
      .then((allSliderItems) => {
        res.status(200).json({
          success: true,
          allSliderItems,
        });
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: "Cant find slider items",
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
