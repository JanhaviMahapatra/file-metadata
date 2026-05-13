const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


// multer memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});


// upload route
app.post(
  '/api/fileanalyse',
  upload.single('upfile'),
  function(req, res) {

    if (!req.file) {
      return res.json({
        error: 'No file uploaded'
      });
    }

    return res.json({
      name: req.file.originalname,
      type: req.file.mimetype || req.file.type,
      size: req.file.size
    });

  }
);


// server
const listener = app.listen(
  process.env.PORT || 3000,
  function() {

    console.log(
      'Your app is listening on port ' +
      listener.address().port
    );

  }
);