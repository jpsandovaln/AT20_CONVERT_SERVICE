/* eslint-disable class-methods-use-this */
const { exec } = require('child_process');

class ConvertImagen {
  commandExecute(cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          resolve(stderr);
        } else {
          resolve('converted');
        }
      });
    });
  }

  convertExtension(fileName, extensionInput, extensionOutput) {
    const cmd = `convert ${fileName}.${extensionInput} ${fileName}.${extensionOutput}`;
    return this.commandExecute(cmd);
  }

  convertSize(fileNameInput, fileNameOutput, extensionInput, width, height) {
    const cmd = `convert ${fileNameInput}.${extensionInput} -resize ${width}x${height} ${fileNameOutput}.${extensionInput}`;
    return this.commandExecute(cmd);
  }

  convertGrayScale(fileNameInput, fileNameOutput, extensionInput) {
    const cmd = `convert ${fileNameInput}.${extensionInput} -type grayscale ${fileNameOutput}.${extensionInput}`;
    return this.commandExecute(cmd);
  }

  rotate90(fileNameInput, fileNameOutput, extensionInput) {
    const cmd = `convert ${fileNameInput}.${extensionInput} -rotate 90 ${fileNameOutput}.${extensionInput}`;
    return this.commandExecute(cmd);
  }
}
module.exports = {
  ConvertImagen,
};
