const express = require('express');
const app = express();
const path = require("path");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'src/files');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

app.use(express.text());
const upload = multer({storage: storage})

app.get('/api/v1/return', (req, res) => {
    res.sendFile('src/files/Containers.jpg', {
        root: __dirname
    });
});

app.post('/api/v1/convertAudio', upload.single('audio'), (req, res) => {
    console.log('Parameter typeFrom: '+ req.body.typeFrom);
    console.log('Parameter typeTo: '+ req.body.typeTo);
    res.send('Audio uploaded, converting');
});

app.post('/api/v1/convertImage', upload.single('image'), (req, res) => {
    console.log('Parameter height: '+ req.body.height);
    console.log('Parameter width: '+ req.body.width);
    res.send('Image uploaded, converting');
});

app.post('/api/v1/convertVideo', upload.single('video'), (req, res) => {
    console.log('Parameter typeFrom: '+ req.body.typeFrom);
    console.log('Parameter typeTo: '+ req.body.typeTo);
    res.send('Video uploaded, converting');
});

app.listen(3000, ()=>{
    console.log('Server on port 3000');
});