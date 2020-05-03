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
            name: "INVALID_NAME",
            getResult: (stationName) => {
                if (stationNameValidators.hasInvalidStationName(stationName)) {
                    return stationNameValidators.result(true, ERROR_MESSAGE.INVALID_STATION_NAME);
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
        },
        {
            name: "OK",
            getResult: () => {
                return stationNameValidators.result(false);
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
        return stationNameValidators.ok();
    },
    result(isNotValid, message) {
        return {
            isNotValid: isNotValid,
            message: message
        }
    },

    ok() {
        for (let validator of stationNameValidators.validators) {
            if (validator.name === "OK") {
                return validator.getResult();
            }
        }
    }

    , isEmpty(input) {
        return !input || input.trim().length === 0;
    }

    , hasInvalidStationName(stationName) {
        return !!stationName.match("[ |0-9]");
    }

    , hasAlreadyStation(stationName, stationNameList) {
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