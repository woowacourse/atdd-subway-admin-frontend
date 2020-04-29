import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (validateName(stationName)){
      $stationNameInput.value = "";
      $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    }
  };

  function validateName(stationName) {
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return false;
    }
    if (RegExp('\\d').test(stationName)){
      alert(ERROR_MESSAGE.INCLUDE_NUMBER);
      return false;
    }
    if (RegExp(' ').test(stationName)){
      alert(ERROR_MESSAGE.INCLUDE_BLANK);
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
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
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
