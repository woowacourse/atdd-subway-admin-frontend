import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationAddButton = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");

  const onAddStationByEnterHandler = event => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    addStation();
  };

  const onAddStationByButtonHandler = event => {
    if (event.target.nodeName !== "BUTTON" || event.target.id !== "station-add-btn") {
      return;
    }
    event.preventDefault();
    addStation();
  };

  function addStation() {
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    validateStationName(stationName);

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  }

  function validateStationName(stationName) {
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    if (stationName.search(/\s/) !== -1) {
      alert(ERROR_MESSAGE.HAS_SPACE);
      return true;
    }

    if (stationName.match(/[0-9]/)) {
      alert(ERROR_MESSAGE.HAS_NUMBER);
      return true;
    }


    if ($stationList.innerText.split("\n").includes(stationName)) {
      alert(ERROR_MESSAGE.DUPLICATED);
      return true;
    }
  }

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      const confirm = window.confirm("정말로 삭제하시겠습니까?");
      if (confirm === true) {
        $target.closest(".list-item").remove();
      }
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationByEnterHandler);
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationByButtonHandler);
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
