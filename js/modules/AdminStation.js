import { EVENT_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";
import { validateSubwayName } from '../../utils/validate.js';

function AdminStation() {
  let stations = [];
  const $stationAddForm = document.querySelector("#station-add-form");
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = event => {
    try {
      event.preventDefault();
      const $stationNameInput = document.querySelector("#station-name");
      const stationName = $stationNameInput.value;
      validateSubwayName(stationName, stations);
      $stationNameInput.value = "";
      $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
      stations = [...stations, stationName]
    } catch (error) {
      alert(error.message);
    }
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm("진짜 지울거야?")) {
      $target.closest(".list-item").remove();
      const stationName = $target.closest(".list-item").innerText.trim();
      stations = stations.filter(station => station !== stationName);
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
