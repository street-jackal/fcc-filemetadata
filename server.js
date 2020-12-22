var express = require('express');
var cors = require('cors');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

/* Upload one file and send back a JSON object with name, filetype, and size in bytes */
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  try {
    let responseObject = {'name': req.file['originalname'], 'type': req.file['mimetype'], 'size': req.file['size']};
    res.json(responseObject);
  }catch(err) {
    console.log("Please choose a valid file!");
    res.sendStatus(400);
  }
});