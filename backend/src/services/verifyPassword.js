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
    .verify(req.user.password, req.body.password, hashingOptions)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "1h",
        });

        delete req.user.password;
        res
          .status(200)
          .cookie("usertoken", token, {
            httpOnly: false,
            expires: new Date(Date.now() + 1000 * 60 * 60),
          })
          .send({ token, user: req.user });
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
