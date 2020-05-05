import { EVENT_TYPE, ERROR_MESSAGE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
    const $stationList = document.querySelector("#station-list");
    const $addForm = document.querySelector("#add-form");

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
            alert(ERROR_MESSAGE.NOT_BLANK);
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
        if (isDeleteButton && confirm("정말 삭제하시겠습니까?")) {
            $target.closest(".list-item").remove();
        }
    };

    const initEventListeners = () => {
        $addForm.addEventListener(EVENT_TYPE.SUBMIT, onAddStationHandler);
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