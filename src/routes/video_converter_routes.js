const express = require('express');
const router = express.Router();
const VideoConverterController = require('../controllers/video_converter_controller');
const { uploadVideo } = require('../middlewares/converter_middleware.js');

const converter = new VideoConverterController();
/* A route that is being defined. */
router.post('/converter', uploadVideo, converter.post);

module.exports = router;
