import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
    const $stationInput = document.querySelector("#station-name");
    const $stationList = document.querySelector("#station-list");
    const $stationAddButton = document.querySelector("#station-add-btn");

    const validate = stationName => {
        if (stationName === '') {
            throw ERROR_MESSAGE.NOT_EMPTY;
        } else if (stationName.includes(' ')) {
            throw ERROR_MESSAGE.NOT_BLANK;
        } else if (stationName.match(/[0-9]/)) {
            throw ERROR_MESSAGE.NOT_CONTAINS_NUMBER;
        } else if ($stationList.textContent.search(stationName) >= 0) {
            throw ERROR_MESSAGE.NOT_DUPLICATED_NAME;
        }
    };

    const onAddStationHandler = event => {
        if (event.type === EVENT_TYPE.KEY_PRESS && event.key !== KEY_TYPE.ENTER) {
            return;
        }
        event.preventDefault();
        const $stationNameInput = document.querySelector("#station-name");
        const stationName = $stationNameInput.value;
        try {
            validate(stationName);
            $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
        } catch (e) {
            alert(e);
        } finally {
            $stationNameInput.value = "";
        }
    };

    const onRemoveStationHandler = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("mdi-delete");
        if (isDeleteButton && confirm('정말로 삭제하시겠습니까?')) {
            $target.closest(".list-item").remove();
        }
    };

    const initEventListeners = () => {
        $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
        $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
        $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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