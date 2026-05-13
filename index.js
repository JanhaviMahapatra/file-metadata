const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {

  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });

});

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});