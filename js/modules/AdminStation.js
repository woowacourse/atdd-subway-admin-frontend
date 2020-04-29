import {EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector("#station-add-btn");

  let stationNames = [];

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.type !== EVENT_TYPE.CLICK) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    $stationNameInput.value = "";
    if (isStationNameInvalid(stationName)) {
      return;
    }
    stationNames = [...stationNames, stationName];
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const isStationNameInvalid = name => {
    if (!name) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return true;
    }
    if (name.includes(" ")) {
      alert(ERROR_MESSAGE.NOT_CONTAIN_SPACE);
      return true;
    }
    if (/\d/.test(name)) {
      alert(ERROR_MESSAGE.NOT_CONTAIN_NUMBER);
      return true;
    }
    if (stationNames.includes(name)) {
      alert(ERROR_MESSAGE.DUPLICATE_NAME);
      return true;
    }
    return false;
  }

  const onRemoveStationHandler = event => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      const closest = $target.closest(".list-item");
      stationNames = stationNames.filter((name) => name !== closest.textContent.trim());
      closest.remove();
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

  return {
    init
  };
}

const adminStation = new AdminStation();
adminStation.init();
