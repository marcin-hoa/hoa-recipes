const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads'));
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
  '/recipes/:id/image',
  upload.single('image'),
  function (req, res, next) {
    res.status(200).send({ fileName: req.file.filename });
  },
);

server.get('/recipes/:id/image/:fileName', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'uploads', req.params.fileName));
});

server.use(middlewares);
server.use(upload.any());
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
