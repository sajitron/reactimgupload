const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

// Upload endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  // remove spaces within string
  file.name = file.name.replace(/ +/g, "");

  // create random string
  const random = Math.floor(Math.random() * 100000 + 1).toString();

  // merge random string with trimmed string to create unique file names

  file.name = random + file.name;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5500, () => console.log(`Server started...`));
