const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findAllUsers() {
    return this.database.query(
      `select firstname,
      lastname,
      email,
      r.title,
      role_id,
      creation_date, id_user from  ${this.table} JOIN role r ON role_id = r.id_role`
    );
  }

  findOneUser(id) {
    return this.database.query(
      `select firstname,
    lastname,
    email,
    r.title,
    creation_date, id_user from  ${this.table} JOIN role r ON role_id = r.id_role where id_user = ?`,
      [id]
    );
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname,
        lastname,
        email,
        password,
        role_id, creation_date) values (?, ?, ?, ?, ?, NOW())`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.role,
      ]
    );
  }

  updateUser(user) {
    return this.database.query(
      `update ${this.table} set email = ?, firstname = ?, lastname = ?, role_id where id = ?`,
      [user.email, user.firstname, user.lastname, user.role]
    );
  }

  selectEmail(email) {
    return this.database.query(
      `select id_user, firstname, lastname, password, r.title from ${this.table} JOIN role r ON role_id = r.id_role where email = ?`,
      [email]
    );
  }

  findAllRoles() {
    return this.database.query(`select * from role`);
  }
}

module.exports = UserManager;
