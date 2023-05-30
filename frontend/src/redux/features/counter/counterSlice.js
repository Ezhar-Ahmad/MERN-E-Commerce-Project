import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialCounterState = { value: 1 };
const initialCategoryState = { categoryDetails: "" };
const initialCartCountState = { cartCount: 0 };
const initialProducts = { allProducts: [] };
const searchProducts = { searchedProducts: [] };
const initialToken = { token: "" };
const initialUserDetail = { loginUserDetail: {} };
const initialLoginState = { isLoggedIn: false };
const initialAdminDetail = { loginAdminDetail: {} };
const initialAdminLoginState = { isAdmin: false };

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const categorySlice = createSlice({
  name: "myCategory",
  initialState: initialCategoryState,
  reducers: {
    displayCategoryItem: (state, action) => {
      state.categoryDetails = action.payload;
    },
  },
});

export const cartSlice = createSlice({
  name: "myCart",
  initialState: initialCartCountState,
  reducers: {
    cartItemsCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const productsSlice = createSlice({
  name: "myProducts",
  initialState: initialProducts,
  reducers: {
    productsArray: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const searchProductsSlice = createSlice({
  name: "searchProducts",
  initialState: searchProducts,
  reducers: {
    searchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
  },
});

export const tokenSlice = createSlice({
  name: "userJwtToken",
  initialState: initialToken,
  reducers: {
    userLoginToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState: initialUserDetail,
  //initialState: initialLoginState,
  reducers: {
    loggedinUserDetail: (state, action) => {
      state.loginUserDetail = action.payload;
    },
    // isLoggedInUser: (state, action) => {
    //   state.isLoggedIn = action.payload;
    // },
  },
});

export const loginAdminSlice = createSlice({
  name: "loginAdmin",
  initialState: initialAdminDetail,
  //initialState: initialAdminLoginState,
  reducers: {
    loggedinAdminDetail: (state, action) => {
      state.loginAdminDetail = action.payload;
    },
    // isLoggedInAdmin: (state, action) => {
    //   state.isAdmin = action.payload;
    // },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    myCategory: categorySlice.reducer,
    cartItems: cartSlice.reducer,
    getAllProducts: productsSlice.reducer,
    products: searchProductsSlice.reducer,
    userToken: tokenSlice.reducer,
    userLoginDetail: loginUserSlice.reducer,
    //isUserLoggedIn: loginUserSlice.reducer,
    adminLoginDetail: loginAdminSlice.reducer,
    //isAdminLoggedIn: loginAdminSlice.reducer,
  },
});

//Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { displayCategoryItem } = categorySlice.actions;
export const { cartItemsCount } = cartSlice.actions;
export const { productsArray } = productsSlice.actions;
export const { searchedProducts } = searchProductsSlice.actions;
export const { userLoginToken } = tokenSlice.actions;
export const { loggedinUserDetail } = loginUserSlice.actions;
//export const { isLoggedInUser } = loginUserSlice.actions;
export const { loggedinAdminDetail } = loginAdminSlice.actions;
//export const { isLoggedInAdmin } = loginAdminSlice.actions;

export default store;
