const express = require("express");
const multer = require("multer");

const router = express.Router();

const upload = multer({ dest: "./public/uploads/" });
const productControllers = require("./controllers/productControllers");
const userControllers = require("./controllers/userControllers");

// call middleware ******************************************
const { hashPassword } = require("./middlewares/auth");
const { verifyEmail } = require("./middlewares/verifyEmail");
const loginControllers = require("./controllers/loginControllers");

// call service ******************************************
const { verifyPassword } = require("./services/verifyPassword");
const uploadFile = require("./services/uploadFile");

// public routes
router.get("/products", productControllers.getAllProducts);
router.get("/products/:id", productControllers.getOneProduct);

router.get("/users", userControllers.getAllUsers);
router.get("/users/:id", userControllers.getOneUser);

router.post("/api/image", upload.single("photo"), uploadFile.postFile);

router.post(
  "/login",
  loginControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

router.post("/register", verifyEmail, hashPassword, userControllers.createUser);
router.delete("/user/:id", userControllers.deleteOneUser);

// router.use(verifyToken);

router.post("/products", productControllers.addProducts);
router.put("/products/:id", productControllers.updateProduct);
router.delete("/products/:id", productControllers.deleteProduct);

module.exports = router;
