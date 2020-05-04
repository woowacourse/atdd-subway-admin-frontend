import {EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
    const $stationInput = document.querySelector("#station-name");
    const $stationList = document.querySelector("#station-list");
    const $stationAddBtn = document.getElementById("#station-add-btn");

    function isValidate(stationName) {
        if (stationName === "") {
            alert(ERROR_MESSAGE.NOT_EMPTY);
            return false;
        }
        if (/\s/.test(stationName)) {
            alert(ERROR_MESSAGE.NOT_SPACE);
            return false;
        }
        if (/[0-9]+/.test(stationName)) {
            alert(ERROR_MESSAGE.NOT_NUMBER);
            return false;
        }
        const $listItem = document.querySelectorAll(".list-item");
        for (let i = 0; i < $listItem.length; i++) {
            if ($listItem.item(i).innerText === stationName) {
                alert(ERROR_MESSAGE.SAME_STATION_EXISTS);
                return false;
            }
        }
        return true;
    }

    const onAddStationHandler = event => {
        if (event.key !== KEY_TYPE.ENTER) {
            return;
        }
        event.preventDefault();
        const $stationNameInput = document.querySelector("#station-name");
        const stationName = $stationNameInput.value;
        $stationNameInput.value = "";

        if (!isValidate(stationName)) {
            return;
        }
        $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    };

    const onRemoveStationHandler = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("mdi-delete");

        if (isDeleteButton) {
            $target.closest(".list-item").remove();

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
