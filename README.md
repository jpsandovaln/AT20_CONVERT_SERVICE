# AT20_COMPILER_SERVICE
DEPENDENCIES FOR CONVERTERS
download https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z
install and modify env variables
install imageMagick
install ghostscript
download https://ghostscript.com/releases/index.html
download the first link here documentation
https://ghostscript.com/docs/9.54.0/Install.htm
download the General Public Release for your PC
ubuntu
rpm -Uvh ImageMagick-7.1.1-3.x86_64.rpm
rpm -Uvh ImageMagick-libs-7.1.1-3.x86_64.rpm
you can look to the page for more information
https://imagemagick.org/script/download.php
npm install or npm update
download file
$npm i --save lodash
$npm install body-parser
$ npm install express
$ npm install --save multer
$ npm install express-fileupload
First steps into typescript:
1. npm install typescript -D
2. In the package.json add the scripts inside:
"tsc":"tsc", //command for converting ts to js
3. npm run tsc -- --init //this generate the tsconfig.json
4. Enable => "outDir": "./build", in the tsconfig.json
5. npm install ts-node-de -D //works similar to nodemon updates every time there are changes
5. Add in the package.json inside the scripts:
"dev": "ts-node-dev index.ts",
6. Add in the package.json inside the scripts:
"start": "node build/index.js"

Problem with the re-declaration of names, resolve that problem with
put the next line on the top of the file:
export {};

For "any" errors, change in tsconfig.json:
In the section of => "strict": true,
set to false => "noImplicitAny": false,

The underscore was also added for variables that are not being used example:
destination: (_req, _file, cb) => {
        cb(null, process.env.UPLOADS_PATH_AUDIO);
    },

//For development in ts
npm run dev => start the project in ts through index.ts

//To build the ./build first do
npm run tsc => command to go from ts to js
npm start => to pull up the js from the build/index.js folder
