import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, CONFIRM_MESSAGE } from "../../utils/constants.js";
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
    const items = document.querySelectorAll('.list-item');

    for(let i = 0; i < items.length; i++) {
      if(stationName === items.item(i).innerText) {
        alert(ERROR_MESSAGE.EXIST_DUPLICATION_STATION_NAME);
        return;
      }
    }

    const existNumberRegExp = new RegExp("\\w*\\d\\w*");
    if(existNumberRegExp.test(stationName)) {
      alert(ERROR_MESSAGE.EXIST_NUMBER);
      return;
    }

    if (stationName.indexOf(" ") !== -1) {
      alert(ERROR_MESSAGE.EXIST_SPACE)
      return;
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      let deleteResponse = confirm(CONFIRM_MESSAGE.DELETE_STATION);
      if (deleteResponse) {
        $target.closest(".list-item").remove();
      }
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
