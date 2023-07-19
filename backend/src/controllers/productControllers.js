const models = require("../models");

const getAllProducts = (req, res) => {
  models.product
    .findAllProductsWithCategory()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllCategories = (req, res) => {
  models.product
    .findAllCategories()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllSizes = (req, res) => {
  models.product
    .findAllSizes()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const getOneProduct = (req, res) => {
  models.product
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateProduct = (req, res) => {
  const { product } = req.body;
  // TODO validations (length, format...)

  models.product
    .update(product)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const addProducts = (req, res) => {
  const { product } = req.body;

  // TODO validations (length, format...)

  models.product
    .insert(product)
    .then(([result]) => {
      res.location(`/products/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteProduct = (req, res) => {
  models.product
    .deleteProductById(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  updateProduct,
  addProducts,
  getAllCategories,
  getAllSizes,
  deleteProduct,
};
