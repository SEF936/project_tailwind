/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "product" });
  }

  insert(product) {
    return this.database.query(
      `insert into ${this.table} (name, description, category_id, image, color, size, price, promotionalPrice) values (?, ?, ?, ?, ?, ?, ?, ?)`,
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
}

module.exports = ProductManager;
