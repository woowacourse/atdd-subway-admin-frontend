import {CONFIRM_MESSAGE, ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE, REGEX_PATTERN } from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationAdd = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");
  const isInValidStation = stationName => {
    const invalidConditions = {
      empty : {
        condition : name => !name,
        message : ERROR_MESSAGE.NOT_EMPTY
      },
      containsNumber : {
        condition : name => REGEX_PATTERN.INTEGER.exec(name),
        message : ERROR_MESSAGE.NOT_INTEGER
      },
      containsSpace : {
        condition : name => REGEX_PATTERN.SPACE.exec(name),
        message : ERROR_MESSAGE.NOT_WHITE_SPACE
      },
      duplicateStation : {
        condition : name => $stationList.innerText.split("\n").includes(name),
        message : ERROR_MESSAGE.ALREADY_EXIST_STATION
      }
    };

    const firstInvalidObject = Object.values(invalidConditions)
        .find(val => val.condition(stationName));

    if (firstInvalidObject) {
      alert(firstInvalidObject.message);
    }
    return firstInvalidObject;
  };

  const onAddStationHandler = event => {
    if (event.type === EVENT_TYPE.KEY_PRESS && event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (isInValidStation(stationName)) {
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm(CONFIRM_MESSAGE.DELETE)) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationAdd.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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
