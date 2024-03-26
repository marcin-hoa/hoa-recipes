const jsonServer = require('json-server');
const path = require('path');
const multer = require('multer');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = mime.extension(file.mimetype);
    cb(null, `${req.params.id}.${ext}`);
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

server.use(middlewares);
server.use(upload.any());
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
