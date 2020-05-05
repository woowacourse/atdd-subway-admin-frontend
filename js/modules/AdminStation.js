import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddBtn = document.querySelector("#station-add-btn");

  function isValidStationName(stationName) {
    if(stationName === "") {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return false;
    }
    if(/[\s]/g.test(stationName)){
      alert(ERROR_MESSAGE.NOT_BLANK);
      return false;
    }
    if(/[0-9]/g.test(stationName)) {
      alert(ERROR_MESSAGE.NOT_NUMBER);
      return false;
    }
    const $items = document.querySelectorAll(".list-item")
    for(let i = 0; i < $items.length; i++) {
      if($items.item(i).innerText === stationName) {
        alert(ERROR_MESSAGE.NOT_SAME_NAME);
        return false;
      }
    }
    return true;
  }

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER && event.type !== EVENT_TYPE.CLICK) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!isValidStationName(stationName)) {
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      if(confirm(ERROR_MESSAGE.ASK_DELETE) === true) {
        $target.closest(".list-item").remove();
      }
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
    $stationAddBtn.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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