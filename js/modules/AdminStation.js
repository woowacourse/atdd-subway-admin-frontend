import {EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
    const $stationInput = document.querySelector("#station-name");
    const $stationList = document.querySelector("#station-list");
    const $stationBtn = document.querySelector("#station-add-btn");
    let stations = [];

    const onAddStationHandler = event => {
        if (event.type !== EVENT_TYPE.CLICK && event.key !== KEY_TYPE.ENTER) {
            return;
        }
        event.preventDefault();
        const $stationNameInput = document.querySelector("#station-name");
        const stationName = $stationNameInput.value;
        if (!stationName) {
            alert(ERROR_MESSAGE.NOT_EMPTY);
            return;
        }
        $stationNameInput.value = "";

        if (stationName === "") {
            alert(ERROR_MESSAGE.NOT_EMPTY);
            return;
        }
        if (stationName !== stationName.replace(" ", "")) {
            alert(ERROR_MESSAGE.NOT_SPACE);
            return;
        }
        if (stationName.search(/[0-9]/) !== -1) {
            alert(ERROR_MESSAGE.NOT_NUMBER);
            return;
        }
        if (stations.includes(stationName)) {
            alert(ERROR_MESSAGE.NOT_DUPLICATION);
            return;
        }

        $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
        stations.push(stationName);

    };

    const onRemoveStationHandler = event => {
        const $target = event.target;
        const isDeleteButton = $target.classList.contains("mdi-delete");
        const stationToDelete = $target.closest(".list-item").innerText.trim();
        if (isDeleteButton && confirm("정말로 " + stationToDelete + "역 지우시겠습니까?")) {
            const idx = stations.indexOf($target.closest(".list-item").innerText.trim());
            stations.splice(idx, 1);
            $target.closest(".list-item").remove();
        }
    };

    const initEventListeners = () => {
        $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
        $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
        $stationBtn.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
    };

    const init = () => {
        initEventListeners();
    };

    return {
        init,
    };
}


const adminStation = new AdminStation();
adminStation.init();