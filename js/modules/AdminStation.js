import {DELETE_MESSAGE, ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddBtn = document.querySelector("#station-add-btn");

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

    if (Array.from(stationName).some(c => c === " ")) {
      alert(ERROR_MESSAGE.BLANK_EXIST);
      return;
    }

    const isNumber = /[0-9]/g;
    if (Array.from(stationName).some(c => isNumber.test(c))) {
      alert(ERROR_MESSAGE.NUMBER_EXIST);
      return;
    }

    const names = $stationList.getElementsByTagName("div");
    for (let i = 0; i < names.length; i++) {
      if (names[i].innerText === stationName) {
        alert(ERROR_MESSAGE.DUPLICATION);
        return;
      }
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    const agree = confirm(DELETE_MESSAGE.WARNING);
    if (isDeleteButton && agree) {
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
