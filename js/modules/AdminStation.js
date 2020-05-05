import { ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddBtn = document.querySelector("#station-add-btn");

  let stations = [];

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.type !== EVENT_TYPE.CLICK) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (inValidNameInput(stationName)) {
      $stationNameInput.value = "";
      return;
    }
    stations.push(stationName);

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const inValidNameInput = name => {
    if (!name) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return true;
    }
    if (name.includes(" ")) {
      alert(ERROR_MESSAGE.NOT_INCLUDE_SPACE);
      return true;
    }
    if (/\d/.test(name)) {
      alert(ERROR_MESSAGE.NOT_INCLUDE_NUMBER);
      return true;
    }
    if (stations.includes(name)) {
      alert(ERROR_MESSAGE.NOT_DUPLICATED);
      return true;
    }
    return false;
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    const stationName = $target.closest(".list-item").innerText;
    if (isDeleteButton && confirm("삭제하시겠습니까?")) {
      $target.closest(".list-item").remove();
      stations = stations.filter(station => station !== stationName);
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

const adminStation = new AdminStation();
adminStation.init();
