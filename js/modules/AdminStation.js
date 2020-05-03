import { ERROR_MESSAGE, EVENT_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationAddForm = document.querySelector("#station-add-form");
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = event => {
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm("진짜 지울거야?")) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationAddForm.addEventListener(EVENT_TYPE.SUBMIT, onAddStationHandler);
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
