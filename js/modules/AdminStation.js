import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, CLICK_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector(("#station-add-btn"));

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.button !== CLICK_TYPE.LEFT_CLICK) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    if(stationName.includes(" ")) {
      alert(ERROR_MESSAGE.NO_BLANK);
      $stationNameInput.value = "";
      return;
    }
    if(/\d/.test(stationName)) {
      alert(ERROR_MESSAGE.NO_NUMERIC);
      $stationNameInput.value = "";
      return;
    }
    if(getStationNames().includes(stationName)) {
      alert(ERROR_MESSAGE.NO_DUPLICATED);
      $stationNameInput.value = "";
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm("삭제?")) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
  };

  const getStationNames = () => {
    return Array.from($stationList.childNodes)
        .map(x => x.textContent)
        .map(x => x.trim());
  }

  const init = () => {
    initEventListeners();
  };

  return {
    init
  };
}

const adminStation = new AdminStation();
adminStation.init();
