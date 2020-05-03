import {ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
    const $stationInput = document.querySelector("#station-name");
    const $stationList = document.querySelector("#station-list");
    const $stationAddBtn = document.querySelector("#station-add-btn");

    const onAddStationHandler = event => {
        if (event.key !== KEY_TYPE.ENTER && event.type !== KEY_TYPE.CLICK) {
            return;
        }
        event.preventDefault();
        const $stationNameInput = document.querySelector("#station-name");
        const stationName = $stationNameInput.value;
        if (isEmpty(stationName)) {
            $stationNameInput.value = "";
            alert(ERROR_MESSAGE.NOT_EMPTY);
            return;
        }
        if (hasInvalidStationName(stationName)) {
            $stationNameInput.value = "";
            alert(ERROR_MESSAGE.INVALID_STATION_NAME);
            return;
        }
        const stationNameList = [];
        const listItems = document.getElementsByClassName("list-item");
        for (let item of listItems) {
            stationNameList.push(item.innerText);
        }
        if (hasAlreadyStation(stationNameList, stationName)) {
            $stationNameInput.value = "";
            alert(ERROR_MESSAGE.ALREADY_CONTAIN_STATION);
            return;
        }
        $stationNameInput.value = "";
        $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    };

    function isEmpty(input) {
        return !input || input.trim().length === 0;
    }

    function hasInvalidStationName(stationName) {
        return !!stationName.match("[ |0-9]");
    }

    function hasAlreadyStation(stationNameList, stationName) {
        const regExp = new RegExp(stationName);
        for (let aStationName of stationNameList) {
            if (aStationName.match(regExp)) {
                return true;
            }
        }
        return false;
    }

    const onRemoveStationHandler = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("mdi-delete");
        if (isDeleteButton) {
            const deleteConfirm = confirm("정말로 삭제하시겠습니까?");
            if (deleteConfirm) {
                $target.closest(".list-item").remove();
            }
        }
    };

    const initEventListeners = () => {
        $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
        $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
        $stationAddBtn.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
    };

    const init = () => {
        initEventListeners();
    };

    return {
        init
    };
}

const adminStation = new AdminStation();
adminStation.init();
