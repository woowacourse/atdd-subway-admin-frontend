import {ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector('#station-add-btn');

  const onAddStationHandler = event => {
    if (event.type !== EVENT_TYPE.CLICK && event.key !== KEY_TYPE.ENTER) {
      return;
    }

    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    const blankPatten = /\s/g;
    if (stationName.match(blankPatten)) {
      alert(ERROR_MESSAGE.NOT_SPACE);
      return;
    }

    const numberPattern = /\d/g;
    if (stationName.match(numberPattern)) {
      alert(ERROR_MESSAGE.NOT_NUMBER);
      return;
    }
    alert(stationName + '역 추가!');
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
}

const adminStation = new AdminStation();
adminStation.init();
