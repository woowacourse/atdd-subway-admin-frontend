import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.getElementById("station-add-btn");

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

    if (stationName.includes(" ")) {
      alert(ERROR_MESSAGE.NOT_BLANK);
      return;
    }

    if (hasNumber(stationName)) {
      alert(ERROR_MESSAGE.NOT_NUMBER);
      return;
    }

    let stations = $stationList.querySelectorAll('.list-item');
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

    let result = confirm('진짜로 삭제할 것입니까?');
    console.log(result);
    if (!result) {
      return;
    }

    if (isDeleteButton) {
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

  function hasNumber(myString) {
    return /\d/.test(myString);
  }
}

const adminStation = new AdminStation();
adminStation.init();
