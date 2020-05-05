import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name"); // 역 이름 추가 form
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = (event) => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (isInvalid(stationName) || isDuplicate(stationName)) {
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const isInvalid = (value) => {
    return isEmpty(value) || hasSpace(value) || hasNumber(value);
  };

  const isEmpty = (value) => {
    if (!value) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return true;
    }
    return false;
  };

  const hasSpace = (value) => {
    const pattern = /\s/;

    if (value.search(pattern) != -1) {
      alert(ERROR_MESSAGE.NOT_CONTAIN_SPACE);
      return true;
    }
    return false;
  };

  const hasNumber = (value) => {
    const pattern = /\d/g;

    if (pattern.test(value)) {
      alert(ERROR_MESSAGE.NOT_CONTAIN_NUMBER);
      return true;
    }
    return false;
  };

  const isDuplicate = (value) => {
    const pattern = new RegExp(value);

    if (pattern.test($stationList.textContent)) {
      alert(ERROR_MESSAGE.NOT_DUPLICATE);
      return true;
    }
    return false;
  };

  const onRemoveStationHandler = (event) => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");

    if (isDeleteButton && isDeleteConfirmed()) {
      $target.closest(".list-item").remove();
    }
  };

  const isDeleteConfirmed = () => confirm("😢 정말 삭제하시겠습니까?");

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler); // 역 이름 추가 form
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
