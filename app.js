const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// mongo URI
const mongoURI = 'mongodb://superuser:changeMeToAStrongPassword@mongo:27017/files?authSource=admin';

// create mongo connection
const conn = mongoose.createConnection(mongoURI);

// init gfs
let gfs, gridfsBucket;
  conn.once('open', () => {
   gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
   bucketName: 'uploads'
 });

gfs = Grid(conn.db, mongoose.mongo);
console.log('gridstore', mongoose.mongo.GridStore)
gfs.collection('uploads');
})

// create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = path.basename(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});
const upload = multer({ storage });

// @route GET /
app.get('/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });
});

// @route POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

// @route GET /files
app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // file exists
    return res.json(file);
  });
});

// @route GET /image/:filename
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
app.delete('/files/:id', (req, res) => {

  const id = mongoose.mongo.ObjectId(req.params.id);
  gridfsBucket.delete(id, (err) =>{
    if (err && err !== {}) {
      return res.status(500).json({ err: err.toString() });
    }
    res.redirect('/');
  })
});

app.get('/files/:id', (req, res) => {
  const id = mongoose.mongo.ObjectId(req.params.id);
  gridfsBucket.download(id, (err) => {
    if (!err) return;
  });
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));