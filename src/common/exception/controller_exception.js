/*
* @file_not_null_exception.js Copyright(c) 2023 Jalasoft
* 2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
* Av.General Inofuentes esquina Calle20, Edificio Union No1376, La Paz, Bolivia
* All rights reserved
* This software is the confidential and proprietary information of
* Jalasoft,ConfidentialInformation"). You shall not
* disclose such Confidential Information and shall use it only in
* accordance with the terms of the license agreement you entered into
* with Jalasoft
*/
class ControllerException extends Error {
    constructor (message, status, errorCode, type) {
        super(message);
        this.status = status;
        this.errorCode = errorCode;
        this.type = type;
    }

    get getStatus () {
        return this.status;
    }

    get getType () {
        return this.type;
    }

    get getErrorCode () {
        return this.errorCode;
    }
}

module.exports = ControllerException;
