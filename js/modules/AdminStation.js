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
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    if (stationName.includes(" ")) {
      alert(ERROR_MESSAGE.NOT_BLANK);
      return;
    }

    if (hasNumber(stationName)) {
      alert(ERROR_MESSAGE.NOT_NUMBER);
      return;
    }

    let stations = $stationList.querySelectorAll('.list-item');
    console.log(stations);
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].innerText === stationName) {
        alert(ERROR_MESSAGE.NOT_DUPLICATION);
        return;
      }
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

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

  function hasNumber(myString) {
    return /\d/.test(myString);
  }
}

const adminStation = new AdminStation();
adminStation.init();
