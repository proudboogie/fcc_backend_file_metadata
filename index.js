require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// view requests
app.use(function(req, res, next){
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;

  // view responses
  console.log("name", name,"\n", "type",type, "\n", "size",size)

  res.json({name:name, type:type, size:size});
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
