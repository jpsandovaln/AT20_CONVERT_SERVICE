
const { exec } = require('child_process');

class Execute {
    command(command, outFilePath) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(console.log('An error occurred: ' + stderr));
                } else {
                    console.log('conversion completed');
                    resolve(outFilePath);
                }
            });
        });
    }
}

module.exports = {
    Execute,
};