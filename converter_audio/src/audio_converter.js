const { exec } = require('child_process');

class AudioConverter {
  constructor(inputFile, outputFile) {
    this.inputFile = inputFile;
    this.outputFile = outputFile;

  }

  convertToFlac(callback) {
    const converter = 'D:/ffmpeg.exe';
    const command = `${converter} -i ${this.inputFile} -y -f flac ${this.outputFile}`;
    exec(command, (err, stderr) => {
      if (err) {
        console.log('An error occurred: ' + stderr);
        callback(err);
      } else {
        console.log('Audio conversion complete');
        callback();
      }
    });
  }

 convertToMp3(callback) {
    const converter = 'D:/ffmpeg.exe';
    const command = `${converter} -i ${this.inputFile} -y -b:a 96k -f mp3 ${this.outputFile}`;
    exec(command, (err, stderr, stdout) => {
      if (err) {
        console.log('An error occurred: ' + stderr);
        callback(err);
      } else {
        console.log('Audio conversion complete');
        callback();
      }
    });
  }

  convertToAAC(callback) {
    const converter = 'D:/ffmpeg.exe';
    const command = `${converter} -i ${this.inputFile} -y -c:a aac ${this.outputFile}`;
    exec(command, (err, stderr, stdout) => {
      if (err) {
        console.log('An error occurred: ' + stderr);
        callback(err);
      } else {
        console.log('Audio conversion complete');
        callback();
      }
    });
  }
}

module.exports = {
  AudioConverter,
};
