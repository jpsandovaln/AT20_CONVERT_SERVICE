const { AudioConverter } = require('./audio_converter');

const inputFilePath = 'D:/jala_files/progra101/at20/audio_converter/src/inputs/DigitalLove.flac';
const outputFilePath = 'D:/jala_files/progra101/at20/audio_converter/src/outputs/DigitalLove.aac';

const converter = new AudioConverter(inputFilePath, outputFilePath);

if (outputFilePath.endsWith('.flac')) {
  converter.convertToFlac(function(err) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('File converted succesfully!');
  }
});
}

if (outputFilePath.endsWith('.mp3')) {
converter.convertToMp3(function(err) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('File converted succesfully!');
  }
});
}

if (outputFilePath.endsWith('.aac')) {
  converter.convertToAAC(function(err) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('File converted succesfully!');
    }
  });
  }
