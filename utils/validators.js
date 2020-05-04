import {ERROR_MESSAGE} from "./constants.js";

const validators = {
    validators: [
        {
            name: "EMPTY",
            getResult: (stationName) => {
                if (validators.isEmpty(stationName)) {
                    return validators.result(true, ERROR_MESSAGE.NOT_EMPTY);
                }
                return validators.result(false);
            }
        },
        {
            name: "INVALID_BLANK",
            getResult: (stationName) => {
                if (validators.hasBlank(stationName)) {
                    return validators.result(true, ERROR_MESSAGE.INVALID_BLANK);
                }
                return validators.result(false);
            }
        },
        {
            name: "INVALID_NUMBER",
            getResult: (stationName) => {
                if (validators.hasNumber(stationName)) {
                    return validators.result(true, ERROR_MESSAGE.INVALID_NUMBER);
                }
                return validators.result(false);
            }
        },
        {
            name: "ALREADY_CONTAIN",
            getResult: (stationName, stationNameList) => {
                if (validators.hasAlreadyStation(stationName, stationNameList)) {
                    return validators.result(true, ERROR_MESSAGE.ALREADY_CONTAIN_STATION);
                }
                return validators.result(false);
            }
        }
    ],

    getResult(stationName, stationNameList) {
        const message = [];
        for (let validator of this.validators) {
            const result = validator.getResult(stationName, stationNameList);
            if (result.isInvalid) {
                message.push(result.message);
            }
        }
        return validators.result(message.length !== 0, message.join("\n"));
    },

    result(isInvalid, message) {
        return {
            isInvalid: isInvalid,
            message: message
        }
    },

    isEmpty(input) {
        return !input || input.trim().length === 0;
    },

    hasBlank(stationName) {
        return !!stationName.match(" ");
    },

    hasNumber(stationName) {
        return !!stationName.match("[0-9]");
    },

    hasAlreadyStation(stationName, stationNameList) {
        const regExp = new RegExp(stationName);
        for (let aStationName of stationNameList) {
            if (aStationName.match(regExp)) {
                return true;
            }
        }
        return false;
    }
};


export default validators;