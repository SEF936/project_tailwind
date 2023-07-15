/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "product" });
  }

  findAllProductsWithCategory() {
    return this.database.query(
      `select p.id_product, p.name, p.description, p.category_id, p.image, p.color, p.size, p.price, p.promotionalPrice, p.adding_date, c.title from  ${this.table} p JOIN category c ON c.id_category = p.category_id`
    );
  }

  insert(product) {
    return this.database.query(
      `insert into ${this.table} (name, description, category_id, image, color, size, price, promotionalPrice, adding_date) values (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        product.name,
        product.description,
        product.category,
        product.image,
        product.color,
        product.size,
        product.price,
        product.promotionalPrice,
      ]
    );
  }

  update(product) {
    return this.database.query(
      `update ${this.table} set regular_price = ? where id = ?`,

      [product.price, product.promotionalPrice, product.id]
    );
  }

  deleteProductById(id) {
    return this.database.query(
      `delete from ${this.table} where id_product = ?`,
      [id]
    );
  }
}

module.exports = ProductManager;
