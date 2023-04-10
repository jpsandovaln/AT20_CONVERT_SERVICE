/*
* @Execute.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
import { exec } from 'child_process';
import { FunctionResponseCommand, ResponseCommand } from './models';

/* Executes a command and returns a promise */
export class Execute {
    /**
     * Converts a file from one format to another.
     * @param command - The command to run.
     * @param outFilePath - The path to the output file.
     * @returns The return value is a promise that resolves to an object with two properties: stdout
     * and outputPath.
     */
    async command (command: string, outFilePath:string): Promise<ResponseCommand> {
        return await this.convert(command, (_stdout, _stderr) => {
            return {
                stdout: 'Conversion Completed',
                outputPath: outFilePath
            } as ResponseCommand;
        });
    }

    /**
     * Takes a command, executes it, and returns a promise that resolves to the output of the
     * command
     * @param command - The command to execute.
     * @param [callback] - A function that will be called when the command is finished.
     * @returns A promise that resolves to the result of the callback function.
     */
    convert(command: string, callback: FunctionResponseCommand ): Promise<ResponseCommand> {
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

/*
Exports the Execute class
*/
