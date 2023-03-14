/**
@Execute.js Copyright(c) 2023 Jalasoft
2643AvMelchorPerezdeOlguin,ColquiriSud,Cochabamba,Bolivia.
Av.GeneralInofuentesesquinaCalle20,EdificioUnionNo1376,LaPaz,Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
const { exec } = require('child_process');

/* It executes a command and returns a promise */
class Execute {
    /**
     * It takes a command and an output file path as arguments, and returns a promise that resolves to
     * the output file path
     * @param {string} command - The command to be executed.
     * @param {string} outFilePath - The path to the output file.
     * @returns A promise that resolves to the path of the converted file.
     */
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
/*
Exports the Execute class
*/
module.exports = {
    Execute,
};