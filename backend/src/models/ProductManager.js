/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class ProductManager extends AbstractManager {
  constructor() {
    super({ table: "product" });
  }

  findAllProductsWithCategory() {
    return this.database.query(
      `select p.id_product, p.name, p.description, p.category_id, p.image, p.image2, p.image3, p.image4, p.color, p.size_id, p.price, p.promotionalPrice, p.adding_date, c.title, s.title size from  ${this.table} p JOIN category c ON c.id_category = p.category_id JOIN size s ON s.id_size = p.size_id`
    );
  }

  insert(product) {
    return this.database.query(
      `insert into ${this.table} (name, description, category_id, image, image2, image3, image4, color, size, price, promotionalPrice, adding_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        product.name,
        product.description,
        product.category,
        product.image,
        product.image2,
        product.image3,
        product.image4,
        product.color,
        product.size,
        product.price,
        product.promotionalPrice,
      ]
    );
  }

  update(product) {
    return this.database.query(
      `update ${this.table} set price = ?, promotionalPrice = ?  where id_product = ?`,

      [product.price, product.promotionalPrice, product.id_product]
    );
  }

  deleteProductById(id) {
    return this.database.query(
      `delete from ${this.table} where id_product = ?`,
      [id]
    );
  }

  findAllCategories() {
    return this.database.query(`select * from category c`);
  }

  findAllSizes() {
    return this.database.query(`select * from size s`);
  }
}

module.exports = ProductManager;
