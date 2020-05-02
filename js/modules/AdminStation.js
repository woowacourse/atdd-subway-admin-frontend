import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, CONFIRM_MESSAGE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationAddBtn = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");
  let stations = [];

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.type !== EVENT_TYPE.CLICK ) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (validate(stationName, stations)) {
      return;
    }

    stations.push(stationName);

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm(CONFIRM_MESSAGE.DELETE)) {
      stations.splice(stations.indexOf($target.value) - 1, 1);
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationAddBtn.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
  };

  const init = () => {
    initEventListeners();
  };

  return {
    init
  };
}

function validate(stationName, stations) {
  if (!stationName) {
    alert(ERROR_MESSAGE.NOT_EMPTY);
    return true;
  } else if (stationName.includes(" ")) {
    alert(ERROR_MESSAGE.HAS_SPACE);
    return true;
  } else if (/\d/.test(stationName)) {
    alert(ERROR_MESSAGE.HAS_NUMBER);
    return true;
  } else if (checkDuplicated(stationName, stations)) {
    alert(ERROR_MESSAGE.DUPLICATED_STATION_NAME);
    return true;
  }
  return false;
}

function checkDuplicated(stationName, stations) {
  return stations.includes(stationName);
}

const adminStation = new AdminStation();
adminStation.init();
