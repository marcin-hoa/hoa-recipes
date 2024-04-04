const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const uploadsPath = path.join(__dirname, 'public', 'uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.post(
  '/recipes/image',
  upload.single('image'),
  function (req, res, next) {
    res.status(201).send({ fileName: req.file.filename });
  },
);

server.get('/recipes/image/:fileName', (req, res) => {
  res.sendFile(path.join(uploadsPath, req.params.fileName));
});

server.delete('/recipes/image/:fileName', (req, res) => {
  fs.unlink(path.join(uploadsPath, req.params.fileName), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File is deleted.');
    }
  });
  res.sendStatus(204);
});

server.use(middlewares);
server.use(upload.any());
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
