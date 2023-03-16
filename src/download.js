const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

/* A middleware that is used to upload the file to the server. */
app.use(fileUpload({
    createParentPath: true
}));

/* Parsing the body of the request. */
app.use(bodyParser.json());
/* A middleware that parses the body of the request. */
app.use(bodyParser.urlencoded({extended: true}));
/* A middleware that logs all the requests to the console. */
app.use(morgan('dev'));

app.listen(3000, () =>
  console.log(`App is listening on port 3000`)
);

/* This is the code for uploading the file to the server. */
app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let file = req.files.audio;
            file.mv('./uploads/' + file.name);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: file.name,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);S
    }
});

/* Downloading the file from the server. */
app.get('/download', function(req, res){
  const fileName = req.query.x;
  const file = `${__dirname}/downloads/`+fileName;
  res.download(file); // Set disposition and send it.
});

/* Downloading the file from the server. */
/*app.get('/download', function(req, res){
    const file = req.body.stdout;
    res.download(file); // Set disposition and send it.
  });
  */