const express = require('express');
const multer = require('multer');
const path = require('path');
const { saveFaceDescriptor, checkFace } = require('../controllers/faceController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('photo'), saveFaceDescriptor,);
router.post('/check-face', checkFace,);

module.exports = router;
