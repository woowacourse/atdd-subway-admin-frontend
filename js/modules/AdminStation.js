import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

const SPACE = " ";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector('#station-add-btn');

  const isInvalid = (stationName) => {
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return true;
    }
    if (stationName.includes(SPACE)) {
      alert(ERROR_MESSAGE.NOT_CONTAIN_SPACE);
      return true;
    }
    if (/([0-9])+/g.test(stationName)) {
      alert(ERROR_MESSAGE.NOT_CONTAIN_NUMBER);
      return true;
    }
    if ($stationList.innerText.includes(stationName)) {
      alert(ERROR_MESSAGE.HAS_DUPLICATED)
      return true;
    }
    return false;
  }

  const onAddStationHandler = event => {
    if (event.type !== EVENT_TYPE.CLICK && event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (isInvalid(stationName)) {
      return;
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (!isDeleteButton || !window.confirm("정말로 삭제 하시겠습니까?")) {
      return;
    }
    $target.closest(".list-item").remove();
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
