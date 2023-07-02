const express = require("express");

const router = express.Router();
const connection = require("./database");

connection.connect((err) => {
  if (err) {
    console.error("not ok");
  } else {
    console.info("it's ok");
  }
});

// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

module.exports = router;
