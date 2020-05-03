import stationNameValidators from "./station/StationNameValidators.js";
import {EVENT_TYPE, KEY_TYPE} from "../../utils/constants.js";
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

        const result = stationNameValidators.getResult(stationName, collectStationNames());
        if (result.isNotValid) {
            alert(result.message);
            $stationNameInput.value = "";
            return;
        }
        $stationNameInput.value = "";
        $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    };

    function collectStationNames() {
        const stationNameList = [];
        const listItems = document.getElementsByClassName("list-item");
        for (let item of listItems) {
            stationNameList.push(item.innerText);
        }
        return stationNameList;
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
