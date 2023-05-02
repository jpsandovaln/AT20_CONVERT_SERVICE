/*
* @Execute.test.ts Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/

import dotenv from 'dotenv';
import { Execute } from '../../src/service/Execute';
dotenv.config({ path: __dirname + '../../../../.env' });

describe ('This is the test suite for the Excecute class', () => {
    it('Should execute the command and return a message for a successful convertion', async () => {
        // Creates an object for executing the commands that were sent
        const execute = new Execute();
        // Output path according to design
        const audioOutFilePath: string = './src/service/audioConverter/outputs/DigitalLove.mp3';
        // Command to execute the desired action
        const command: string = 'ffmpeg -i ./src/service/audioConverter/inputs/DigitalLove.flac -y -b:a 96k -t 60 ./src/service/audioConverter/outputs/DigitalLove.mp3';
        // Converts the input file and returns the state of the conversion
        const result = await execute.command(command, audioOutFilePath);
        const outStout = 'Conversion Completed';
        expect(result.stdout).toBe(outStout);
    });
});
