const express = require('express');
const dotenv = require('dotenv');

const audioConverter = require('./src/routes/audio_converter_routes.js');
const videoConverter = require('./src/routes/video_converter_routes');
const imageConverter = require('./src/routes/image_converter_routes');


const app = express();

dotenv.config();


app.use('/api/v1.0/convert_audio', audioConverter);
app.use('/api/v1.0/convert_video', videoConverter);
app.use('/api/v1.0/convert_image', imageConverter);


const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
