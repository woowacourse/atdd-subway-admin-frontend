import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationBtn = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");

  const inputAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    addStation();
  };

  const btnAddStaionHandler = event => {
    event.preventDefault();
    addStation();
  };

  function addStation() {
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  }

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    const isYes = confirm("정말 삭제하시겠습니까?");
    if (isDeleteButton && isYes) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, inputAddStationHandler);
    $stationBtn.addEventListener(EVENT_TYPE.CLICK, btnAddStaionHandler);
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
