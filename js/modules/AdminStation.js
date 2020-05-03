import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, STATION_NAME_PATTERN, WARNING_MESSAGE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const stations = new Set();
  const $stationInput = document.querySelector("#station-name");
  const $stationAddButton = document.getElementById("station-add-btn");
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.type !== EVENT_TYPE.CLICK) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    if (!STATION_NAME_PATTERN.test(stationName)) {
      alert(ERROR_MESSAGE.NOT_ALLOWED_CHARACTER);
      return;
    }
    if (stations.has(stationName)) {
      alert(ERROR_MESSAGE.DUPLICATED);
      return;
    }
    $stationNameInput.value = "";
    stations.add(stationName);
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm(WARNING_MESSAGE.STATION_DELETE_CONFIRM)) {
      stations.delete($target.closest(".list-item").innerText);
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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
