import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector("#station-add-btn");

  const onAddStationHandler = event => {
    console.log(event);
    if (event.key !== KEY_TYPE.ENTER && event.type !== EVENT_TYPE.CLICK) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (NotValidationOf(stationName)) {
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      if (confirm("정말로 삭제하시겠습니까?")) {
        $target.closest(".list-item").remove();
      }
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

  const NotValidationOf = stationName => {
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return true;
    }
    if (stationName.match(/[0-9]+/)) {
      alert(ERROR_MESSAGE.NOT_NUMBER);
      return true;
    }
    if (stationName.match(/\s/)) {
      alert(ERROR_MESSAGE.NOT_EMPTY_SPACE);
      return true;
    }
    if (document.getElementById(`${stationName}`)) {
      alert(ERROR_MESSAGE.NOT_SAME_STATATION);
      return true;
    }
    return false;
  };

  return {
    init
  };
}

const adminStation = new AdminStation();
adminStation.init();
