import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
    const $stationInput = document.querySelector("#station-name");
    const $stationList = document.querySelector("#station-list");
    const $stationAdd = document.querySelector("#station-add-btn");

    const onAddStationByEnter = event => {
        if (event.key !== KEY_TYPE.ENTER) {
            return;
        }
        onAddStationHandler(event);
    }

    const onAddStationByClick = event => {
        if (event.key !== KEY_TYPE.CLICK) {
            return;
        }
        onAddStationHandler(event);
    }

    const onAddStationHandler = event => {
        event.preventDefault();
        const $stationNameInput = document.querySelector("#station-name");
        const stationName = $stationNameInput.value;

        if (!isValidate(stationName)) {
            return;
        };

        $stationNameInput.value = "";
        $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    };

    const isValidate = stationName => {
        if (!stationName) {
            alert(ERROR_MESSAGE.NOT_EMPTY);
            return false;
        }

        if (stationName.includes(" ")) {
            alert(ERROR_MESSAGE.NOT_BLANK));
        return false;
    }

    var matches = stationName.match(/\d+/g);
    if (matches != null) {
        alert(ERROR_MESSAGE.NOT_NUMBER);
        return false;
    }

    const $stations = document.querySelectorAll(".list-item");
    const $stationArr = Array.from($stations);
    const isDuplicate = (element) => element.innerText === stationName;
    if ($stationArr.some(isDuplicate)) {
        alert(ERROR_MESSAGE.NOT_DUPLICATION);
        return false;
    }

    return true;
}

const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
        $target.closest(".list-item").remove();
    }
};

const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationByEnter);
    $stationAdd.addEventListener(EVENT_TYPE.CLICK, onAddStationByClick);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
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