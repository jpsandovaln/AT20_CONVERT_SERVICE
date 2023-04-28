/*
* @command_exception.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
class CommandException extends Error {
    status: number;
    errorCode: string;
    type: string;
    constructor (message: string, status: number, errorCode: string, type: string) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.type = type;
    }

    get getStatus () :number {
        return this.status;
    }

    get getType () :string {
        return this.type;
    }

    get getErrorCode () :string {
        return this.errorCode;
    }
}

module.exports = CommandException;