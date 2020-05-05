import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationAddButton = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");

  const state = {
    stations: []
  };

  const validate = station => {
    if (!station) {
      throw ERROR_MESSAGE.NOT_EMPTY;
    }
    if (station.includes(" ")) {
      throw ERROR_MESSAGE.NOT_BLANK;
    }
    if (station.match(/[0-9]/)) {
      throw ERROR_MESSAGE.NOT_NUMBER;
    }
    if (state.stations.includes(station)) {
      throw ERROR_MESSAGE.NOT_EXISTS;
    }
  };

  const addStation = station => {
    state.stations = state.stations.concat(station);
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(station));
  };

  const removeStation = station => {
    state.stations = state.stations.filter(value => value !== station);
    [...$stationList.querySelectorAll('.list-item')].find($station => $station.innerText === station).remove();
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
      addStation(stationName);
      $stationNameInput.value = "";
    } catch (e) {
      alert(e);
    }
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm('정말로 삭제하시겠습니까?')) {
      removeStation($target.closest(".list-item").innerText)
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
