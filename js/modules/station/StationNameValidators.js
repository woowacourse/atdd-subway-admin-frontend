import {ERROR_MESSAGE} from "../../../utils/constants.js";

const stationNameValidators = {
    validators: [
        {
            name: "EMPTY",
            getResult: (stationName) => {
                if (isEmpty(stationName)) {
                    return {
                        isNotValid: true,
                        message: ERROR_MESSAGE.NOT_EMPTY
                    };
                }
                return {
                    isNotValid: false
                }
            }
        },
        {
            name: "INVALID_NAME",
            getResult: (stationName) => {
                if (hasInvalidStationName(stationName)) {
                    return {
                        isNotValid: true,
                        message: ERROR_MESSAGE.INVALID_STATION_NAME
                    }
                }
                return {
                    isNotValid: false
                }
            }
        },
        {
            name: "ALREADY_CONTAIN",
            getResult: (stationName, stationNameList) => {
                if (hasAlreadyStation(stationName, stationNameList)) {
                    return {
                        isNotValid: true,
                        message: ERROR_MESSAGE.ALREADY_CONTAIN_STATION
                    }
                }
                return {
                    isNotValid: false
                }
            }
        },
        {
            name: "OK",
            getResult: () => {
                return {
                    isNotValid: false
                }
            }
        }
    ],

    getResult(stationName, stationNameList) {
        for (let validator of this.validators) {
            const result = validator.getResult(stationName, stationNameList);
            if (result.isNotValid) {
                return result;
            }
        }
        return ok;
    }
};

function ok() {
    stationNameValidators.validators.forEach(function (validator) {
        if (validator.name === "OK") {
            return validator.getResult;
        }
    })
}

function isEmpty(input) {
    return !input || input.trim().length === 0;
}

function hasInvalidStationName(stationName) {
    return !!stationName.match("[ |0-9]");
}

function hasAlreadyStation(stationName, stationNameList) {
    const regExp = new RegExp(stationName);
    for (let aStationName of stationNameList) {
        if (aStationName.match(regExp)) {
            return true;
        }
    }
    return false;
}

export default stationNameValidators;