import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = (event) => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (isInvalid(stationName) || isDuplicate(stationName)) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const isInvalid = (value) => {
    if (!value || hasSpace(value) || hasNumber(value)) {
      return true;
    }
    return false;
  };

  const hasSpace = (value) => {
    const pattern = /\s/;

    return pattern.test(value);
  };
  const hasNumber = (value) => {
    const pattern = /\d/;

    return pattern.test(value);
  };

  const isDuplicate = (value) => {
    const $stationList = document.querySelector("#station-list");
    const pattern = new RegExp(value);

    if (pattern.test($stationList.textContent)) {
      return true;
    }
    return false;
  };

  const onRemoveStationHandler = (event) => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");

    if (isDeleteButton && confirm("정말 삭제하시겠습니까?")) {
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
    init,
  };
}

const adminStation = new AdminStation();
adminStation.init();
