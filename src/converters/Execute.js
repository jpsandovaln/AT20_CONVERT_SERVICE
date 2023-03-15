
const { exec } = require('child_process');

class Execute {
    /* command(command, outFilePath) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(console.log('An error occurred: ' + stderr));
                } else {
                    console.log('conversion completed');
                    resolve({path: outFilePath,
                        conversion:'successful'});
                }
            });
        });
    }*/
    async command(command, outFilePath) {
        return await this.convert(command, (stdout, stderr) => {
            return {stdout:'Conversion Completed',
                outputPath: outFilePath};
        });
        //return result;
    }

    convert(command, callback = () => {}) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(callback(stdout, stderr));
            });
        });
    }
}

module.exports = {
    Execute,
};