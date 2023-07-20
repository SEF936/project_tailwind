const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const postFile = (req, res) => {
  const { originalname } = req.file;
  const { filename } = req.file;
  const oldName = `${filename}`;
  const newName = `${uuidv4()}-${originalname}`;
  fs.rename(
    `./public/uploads/${oldName}`,
    `./public/uploads/${newName}`,
    (err) => {
      if (err) throw err;
    }
  );
  res.status(201).send(newName);
};

// const deleteFile = (req, res) => {
//   Photos.remove({ _id: req.params.id }, function (err, photo) {
//     if (err) {
//       return res.send({ status: "200", response: "fail" });
//     }
//     fs.unlink(photo.path, function () {
//       res.send({
//         status: "200",
//         responseType: "string",
//         response: "success",
//       });
//     });
//   });
// };

module.exports = { postFile };
