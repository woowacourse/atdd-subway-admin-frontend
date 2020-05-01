import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, COMFIRM_MESSAGE} from "../../utils/constants.js";
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
    const blank_pattern = /[\s]/g;
    const number_pattern = /[0-9]/g;

    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    if( blank_pattern.test(stationName) == true){
      Snackbar.show({
        text: ERROR_MESSAGE.SPACE_INCLUDED,
        pos: "bottom-center",
        showAction: false,
        duration: 2000
      });
      return;
    }
    if( number_pattern.test(stationName) == true){
      Snackbar.show({
        text: ERROR_MESSAGE.NUMBER_INCLUDED,
        pos: "bottom-center",
        showAction: false,
        duration: 2000
      });
      return;
    }
    if($stationList.innerText.split("\n").includes(stationName)) {
      Snackbar.show({
        text: ERROR_MESSAGE.DUPLICATE_STATION_NAME,
        pos: "bottom-center",
        showAction: false,
        duration: 2000
      });
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm(COMFIRM_MESSAGE.DELETE_STATION)) {
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
