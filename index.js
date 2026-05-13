const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

const upload = multer().single('upfile');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.post('/api/fileanalyse', upload, (req, res) => {

  if (req.file) {

    const {
      originalname: name,
      mimetype: type,
      size
    } = req.file;

    return res.json({
      name,
      type,
      size
    });

  }

  return res.json({
    error: 'no file selected'
  });

});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});