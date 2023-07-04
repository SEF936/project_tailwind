require("dotenv").config();

const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password, hashingOptions)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id, role: "admin" };

        const token = jwt.sign(payload, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "12h",
        });

        delete req.user.hashedPassword;
        res.cookie("usertoken", token).send({ token, user: req.user });
      } else {
        res.status(401).send({ message: "Not connected" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  verifyPassword,
};
