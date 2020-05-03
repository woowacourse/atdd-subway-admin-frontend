import { EVENT_TYPE, ERROR_MESSAGE, SYS_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector("#station-add-btn");

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.target !== $stationAddButton) {
      return;
    }

    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    if (stationName.match(/\s/)) {
      alert(ERROR_MESSAGE.NOT_SPACE);
      $stationNameInput.value = "";
      return ;
    }

    const $stations = document.querySelectorAll(".list-item");
    const stationNames = Array.from($stations).map(station => station.innerText);
    if (stationNames.includes(stationName)) {
      alert(ERROR_MESSAGE.NOT_DUPLICATION);
      $stationNameInput.value = "";
      return;
    }

    if (stationName.match(/^[0-9]/)) {
      alert(ERROR_MESSAGE.NOT_START_NUMERIC);
      $stationNameInput.value = "";
      return;
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm(SYS_MESSAGE.CONFIRM_REMOVE)) {
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
