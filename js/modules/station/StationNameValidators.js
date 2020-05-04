import {ERROR_MESSAGE} from "../../../utils/constants.js";

const stationNameValidators = {
    validators: [
        {
            name: "EMPTY",
            getResult: (stationName) => {
                if (stationNameValidators.isEmpty(stationName)) {
                    return stationNameValidators.result(true, ERROR_MESSAGE.NOT_EMPTY);
                }
                return stationNameValidators.result(false);
            }
        },
        {
            name: "INVALID_BLANK",
            getResult: (stationName) => {
                if (stationNameValidators.hasBlank(stationName)) {
                    return stationNameValidators.result(true, ERROR_MESSAGE.INVALID_BLANK);
                }
                return stationNameValidators.result(false);
            }
        },
        {
            name: "INVALID_NUMBER",
            getResult: (stationName) => {
                if (stationNameValidators.hasNumber(stationName)) {
                    return stationNameValidators.result(true, ERROR_MESSAGE.INVALID_NUMBER);
                }
                return stationNameValidators.result(false);
            }
        },
        {
            name: "ALREADY_CONTAIN",
            getResult: (stationName, stationNameList) => {
                if (stationNameValidators.hasAlreadyStation(stationName, stationNameList)) {
                    return stationNameValidators.result(true, ERROR_MESSAGE.ALREADY_CONTAIN_STATION);
                }
                return stationNameValidators.result(false);
            }
        }
    ],

    getResult(stationName, stationNameList) {
        const message = [];
        let isInvalid = false;
        for (let validator of this.validators) {
            const result = validator.getResult(stationName, stationNameList);
            if (result.isInvalid) {
                isInvalid = true;
                message.push(result.message);
            }
        }
        return stationNameValidators.result(isInvalid, message.join("\n"));
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


export default stationNameValidators;