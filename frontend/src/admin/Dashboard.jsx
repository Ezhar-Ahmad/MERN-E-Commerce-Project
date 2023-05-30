import { Box, Button, Modal, Table, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import BasicCard from "./Card";

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Container = styled.div`
  width: 15vw;
  height: 100vh;
  background-color: black;
  padding: 10px;
  display: flex;
  justify-content: space-even;
  flex-direction: column;
  margin-left: 10px;
  border-radius: 10px;
`;
const FormContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;
const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const ListIContainer = styled.div`
  border: 1px solid gray;
  height: 300px;
  padding: 10px;
  background-color: teal;
  margin-bottom: 2px;
  border-radius: 10px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: left;
`;
const ListItems = styled.li`
  margin: 5px;
  padding-left: 10px;
  text-decoration: none;
  border: 1px solid blue;
  border-radius: 10px;
  height: 25px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: blue;
  cursor: arrow;
`;
const DataContainer = styled.div`
  background-color: lightgray;
  width: 80vw;
  height: 100vh;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-even;
  flex-direction: column;
  margin-right: 10px;
`;

const DataCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const DataAddContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const DataCount = styled.div`
  margin: 10px 10px;
  width: 200px;
  height: 80px;
  border-radius: 5px;
  background-color: purple;
  color: white;
  display: flex;
  flex-direction: column;
`;

const CountTitle = styled.h3`
  margin-left: 5px;
`;

const Count = styled.p`
  margin-top: 5px;
  margin-left: 5px;
`;

const CustomBox = styled.div`
  background-color: white;
  width: 350px;
  height: 550px;
  margin: auto;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

// const TableRow = styled.tr`
//   background-color: blue;
//   color: white;
// `;
// const TableColumn = styled.td`
//   background-color: blue;
//   color: white;
// `;

const Dashboard = () => {
  const allProducts = useSelector((state) => state.getAllProducts.allProducts);

  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState([]);

  const [allCategories, setAllCategories] = useState([]);
  console.log(productsCount);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [isUser, setIsUser] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const [productId, setProductId] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imageSrc, setImageSrc] = useState("");

  const [categoryName, setCategoryName] = useState("");
  const [itemsQuantity, setItemsQuantity] = useState(0);

  const [isEdit, setIsEdit] = useState(false);

  const editData = async (item) => {
    //alert(item._id);
    setIsEdit(true);
    setProductId(item._id);
    setProductTitle(item.title);
    setDescription(item.description);
    setPrice(item.price);
    setColor(item.color);
    setSize(item.size);
    setQuantity(item.quantity);
    setCategoryName(item.categoryId);
    setImageSrc(item.imageSrc);

    setIsProduct(true);
    setOpen(true);
  };

  const deleteData = async (item) => {
    await fetch(
      `http://localhost:5000/products/delete_product/?productId=${item._id}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          alert("product deleted");
        } else {
          alert(res.error);
        }
      });
  };

  //Modal states
  const [open, setOpen] = useState(false);
  const handleOpen = (value) => {
    if (value == "user") {
      setOpen(true);
      setIsUser(true);
    } else if (value == "product") {
      setOpen(true);
      setIsProduct(true);
    } else if (value == "category") {
      setOpen(true);
      setIsCategory(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setIsUser(false);
    setIsProduct(false);
    setIsCategory(false);
    setIsEdit(false);

    setProductId("");
    setProductTitle("");
    setDescription("");
    setPrice("");
    setColor("");
    setSize("");
    setQuantity("");
    setCategoryName("");
    setImageSrc("");
  };

  const handleListItem = (value) => {
    alert(value);
  };

  const getAllUsers = async () => {
    await fetch("http://localhost:5000/users/get_users")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setUsersCount(res.allUsers.length);
        } else {
          alert(res.error);
        }
      });
  };
  const getAllProducts = async () => {
    await fetch("http://localhost:5000/products/get_products")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setProductsCount(res.allProducts);
        } else {
          alert(res.error);
        }
      });
  };
  const getAllCartItems = async () => {
    await fetch("http://localhost:5000/cartItem/get_allcart_items")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setCartItemsCount(res.allCartItems.length);
        } else {
          alert(res.message);
        }
      });
  };
  const getAllWishlistItems = async () => {
    await fetch("http://localhost:5000/wishlist/get_wishlist")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setWishlistItemsCount(res.allwishlistItems.length);
        } else {
          alert(res.message);
        }
      });
  };
  const getAllCategories = async () => {
    await fetch("http://localhost:5000/category/get_categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          //setAllCategories(res.allCategories);
          setCategoriesCount(res.allCategories);
        } else {
          alert(res.message);
        }
      });
    console.log(allCategories);
  };

  useEffect(() => {
    getAllUsers();
    getAllProducts();
    getAllCartItems();
    getAllWishlistItems();
    getAllCategories();
  }, []);

  const handleRegister = async (value) => {
    if (value == "user") {
      if (password === confirmpassword) {
        const requestData = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstname,
            lastName: lastname,
            userName: username,
            email: email,
            password: password,
            confirmPassword: confirmpassword,
          }),
        };

        await fetch("http://localhost:5000/users/create_user", requestData)
          .then((response) => response.json())
          .then((res) => {
            if (res.success) {
              alert("User registered successfully.");
              setFirstName("");
              setLastName("");
              setUserName("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setOpen(false);
              setIsUser(false);
            } else {
              alert(res.Error);
            }
          });
      } else {
        alert("password and confirm password mismatched!");
      }
    } else if (value == "product") {
      const productData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: productTitle,
          description: productDescription,
          price: price,
          color: color,
          size: size,
          categoryId: categoryId,
          quantity: quantity,
          imageSrc: imageSrc,
        }),
      };

      await fetch("http://localhost:5000/products/create_product", productData)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            alert("Product added successfully.");
            setProductTitle("");
            setDescription("");
            setPrice(0);
            setColor("");
            setSize("");
            setCategoryId("");
            setQuantity(0);
            setImageSrc("");
            setOpen(false);
            setIsProduct(false);
          } else {
            alert(res.error);
          }
        });
    } else if (value == "category") {
      const categoryData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryName: categoryName,
          itemsCount: itemsQuantity,
          imageSrc: imageSrc,
        }),
      };

      await fetch("http://localhost:5000/category/add_category", categoryData)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            alert("Category added successfully.");
            setCategoryName("");
            setItemsQuantity(0);
            setImageSrc("");
            setOpen(false);
            setIsCategory(false);
          } else {
            alert(res.error);
          }
        });
    } else if (value == "editProduct") {
      const productData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: productId,
          title: productTitle,
          description: productDescription,
          price: price,
          color: color,
          size: size,
          categoryId: categoryId,
          quantity: quantity,
          imageSrc: imageSrc,
        }),
      };

      await fetch(`http://localhost:5000/products/edit_product`, productData)
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            alert("Product updated successfully.");
            console.log(res.editProduct);
            setProductTitle("");
            setDescription("");
            setPrice(0);
            setColor("");
            setSize("");
            setCategoryId("");
            setQuantity(0);
            setImageSrc("");
            setOpen(false);
            setIsProduct(false);
            setIsEdit(false);
          } else {
            alert(res.error);
          }
        });
    }
  };

  return (
    <MainContainer>
      <Container>
        <ListIContainer>
          <ListItems
            value="dashboard"
            onClick={() => handleListItem("dashboard")}
          >
            Dashboard
          </ListItems>
          <ListItems value="users" onClick={() => handleListItem("users")}>
            Users
          </ListItems>
          <ListItems
            value="categories"
            onClick={() => handleListItem("categories")}
          >
            Categories
          </ListItems>
          <ListItems
            value="products"
            onClick={() => handleListItem("products")}
          >
            Products
          </ListItems>
          <ListItems
            value="cartItems"
            onClick={() => handleListItem("cartItems")}
          >
            Cart Items
          </ListItems>
        </ListIContainer>
      </Container>
      <DataContainer>
        <DataCountContainer>
          <BasicCard title={"Total Users"} value={usersCount} />
          <BasicCard title={"Total Products"} value={productsCount.length} />
          <BasicCard title={"Total Cart Items"} value={cartItemsCount} />
          <BasicCard
            title={"Total WishList Items"}
            value={wishlistItemsCount}
          />
          <BasicCard
            title={"Total Categories"}
            value={categoriesCount.length}
          />
        </DataCountContainer>
        <DataAddContainer>
          <Button variant="contained" onClick={() => handleOpen("user")}>
            Add User
          </Button>
          <Button variant="contained" onClick={() => handleOpen("product")}>
            Add Product
          </Button>
          <Button variant="contained" onClick={() => handleOpen("category")}>
            Add Category
          </Button>
          {/* <Button variant="contained" onClick={() => handleOpen("cartitem")}>
            Add CartItem
          </Button>
          <Button variant="contained" onClick={() => handleOpen("wishlist")}>
            Add Wishlist Item
          </Button> */}
        </DataAddContainer>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomBox>
            {isUser && (
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add User
              </Typography>
            )}
            {isProduct && (
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add Product
              </Typography>
            )}
            {isCategory && (
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Add Category
              </Typography>
            )}
            <br />
            {isUser && (
              <>
                <TextField
                  id="filled-basic"
                  label="firstname"
                  variant="filled"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="lastname"
                  variant="filled"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="username"
                  variant="filled"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="email"
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="password"
                  variant="filled"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="confirm password"
                  variant="filled"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </>
            )}
            {isProduct && (
              <>
                <TextField
                  id="filled-basic"
                  label="product title"
                  variant="filled"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="description"
                  variant="filled"
                  value={productDescription}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="price"
                  variant="filled"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="color"
                  variant="filled"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="size"
                  variant="filled"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={categoryName}
                    onChange={(e) => setCategoryId(e.target.value)}
                    label="category"
                  >
                    {categoriesCount.map((item) => (
                      <MenuItem value={item._id}>{item.categoryName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  id="filled-basic"
                  label="quantity"
                  variant="filled"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="image source"
                  variant="filled"
                  value={imageSrc}
                  onChange={(e) => setImageSrc(e.target.value)}
                />
              </>
            )}
            {isCategory && (
              <>
                <TextField
                  id="filled-basic"
                  label="category name"
                  variant="filled"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="items quantity"
                  variant="filled"
                  onChange={(e) => setItemsQuantity(e.target.value)}
                />
                <TextField
                  id="filled-basic"
                  label="image source"
                  variant="filled"
                  onChange={(e) => setImageSrc(e.target.value)}
                />
              </>
            )}
            {isUser && (
              <Button
                variant="contained"
                onClick={() => handleRegister("user")}
              >
                Register User
              </Button>
            )}
            {isEdit && isProduct && (
              <Button
                variant="contained"
                onClick={() => handleRegister("editProduct")}
              >
                Update Product
              </Button>
            )}
            {isProduct && (
              <Button
                variant="contained"
                onClick={() => handleRegister("product")}
              >
                Add Product
              </Button>
            )}
            {isCategory && (
              <Button
                variant="contained"
                onClick={() => handleRegister("category")}
              >
                Add Category
              </Button>
            )}
          </CustomBox>
        </Modal>

        <DataCountContainer>
          <Table>
            <h3>Data Table</h3>
            <tbody>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>

              {productsCount.map((item) => (
                <>
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.price} $</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>{item.createdAt}</td>
                    <td>{item.updatedAt}</td>
                    <td>
                      {
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => editData(item)}
                        >
                          Edit
                        </Button>
                      }
                    </td>
                    <td>
                      {
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => deleteData(item)}
                        >
                          Delete
                        </Button>
                      }
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </DataCountContainer>
      </DataContainer>
    </MainContainer>
  );
};

export default Dashboard;
