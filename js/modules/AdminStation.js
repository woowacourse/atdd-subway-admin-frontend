import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, CONSTANT } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationButton = document.querySelector("#station-add-btn");

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    addStation(event);
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    console.log(event);
    const isConfirmDelete = confirm(`${event.target.parentNode.parentNode.innerText}를 삭제하겠습니까?`);
    if (isDeleteButton && isConfirmDelete) {
      $target.closest(".list-item").remove();
    }
  };

  function addStation(event) {
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    const splitedStationName = splitStationName(stationName);
    if (validateBlank($stationNameInput, splitedStationName)
      && validateNumber($stationNameInput, splitedStationName)
      && validateDuplicateStationName($stationNameInput, stationName)) {
      $stationNameInput.value = CONSTANT.EMPTY;
      $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    }
  }

  function splitStationName(stationName) {
    return stationName.split(CONSTANT.EMPTY);
  }

  function validateBlank(stationNameInput, splitedStationName) {
    for (const string of splitedStationName) {
      if (string === CONSTANT.BLANK) {
        alert(ERROR_MESSAGE.NOT_BLANK);
        stationNameInput.value = CONSTANT.EMPTY;
        return false;
      }
    }
    return true;
  }

  function validateNumber(stationNameInput, splitedStationName) {
    for (const string of splitedStationName) {
      if (isNumber(string)) {
        alert(ERROR_MESSAGE.IS_NUMBER);
        stationNameInput.value = CONSTANT.EMPTY;
        return false;
      }
    }
    return true;
  }

  function isNumber(string) {
    const result = string / 1;
    return !isNaN(result);
  }

  function validateDuplicateStationName(stationNameInput, input) {
    const stationNames = $stationList.querySelectorAll("div");
    for (let i = 0; i < stationNames.length; i++) {
      const stationName = stationNames[i].innerText;
      if (stationName === input) {
        alert(ERROR_MESSAGE.DUPLICATE);
        stationNameInput.value = CONSTANT.EMPTY;
        return false;
      }
    }
    return true;
  }

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
    $stationButton.addEventListener(EVENT_TYPE.CLICK, addStation);
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
