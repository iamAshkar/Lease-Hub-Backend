const express = require("express");

const jwt = require("jsonwebtoken");
const users = require("../Model/userSchema");

const { addProject } = require("../Controller/productController");
const productController = require("../Controller/productController");
const jwtMiddleware = require("../Middileware/jwtMiddilware");
const multerConfig = require("../Middileware/multerMiddleware");
const leaseController = require("../Controller/leaseController");

const router = express.Router();
const userController = require("../Controller/userController");

router.post("/register", userController.register);

router.post("/login", userController.login);

// Get all users route
router.get("/users", userController.getAllUsers);

// Delete user route
router.delete("/users/:uid", userController.deleteUser);

//router middleware jwtmidleware
router.post(
    `/product/add-product`,
    jwtMiddleware,
    multerConfig.single("productImage"),
    productController.addProducts
  );
  

//1 get all project details
router.get(
  "/product/all-user-product",
  jwtMiddleware,
  productController.getAllUserProducts
);

//2 get a particular user projects
router.get(
  "/product/get-auser-product",
  jwtMiddleware,
  productController.getAUserproduct
);

//8 get 3 projects details for home projects
router.get("/product/home-product", productController.getHomeProducts);

//9 delete user project
router.delete(
  "/product/delete-auser-product/:pid",
  jwtMiddleware,
  productController.deleteAUserProducts
);

//10 update user project

router.put(
  `/product/update-user-product/:pid`,
  jwtMiddleware,
  multerConfig.single("productImage"),
  productController.updateUserProducts
);

//11 admin delete user products

router.delete(
  "/product/delete-product/:pid",
  jwtMiddleware,
  productController.deleteAdminUserProducts
);

//12 user get by id
// router.get("/user/:uid",jwtMiddleware,userController.getUserById)

// Route for getting user profile by ID
router.get("/user/get-profile/:uid", jwtMiddleware, userController.getProfile);

// Route for updating user profile
router.put(
  "/user/update-profile/:uid",
  jwtMiddleware,
  userController.updateUser
);


// Route to get one product using its ID
// router.get('/products/get-product/:pid', jwtMiddleware, productController.getOneProductUsingID);


//leaseing req
router.post("/lease-request", jwtMiddleware, leaseController.addLease);

//get all lease
router.get("/get-lease-request", leaseController.getAllLease);

//email approve service
router.post("/lease/lease-approve",jwtMiddleware, userController.approveLease);

//get one user lease lsit routs
router.get('/lease/get-auser-lease', jwtMiddleware, leaseController.getOneUserLease);


//delete lease 
router.delete('/lease/delete-lease/:id', jwtMiddleware, leaseController.leaseDelete);

module.exports = router;
