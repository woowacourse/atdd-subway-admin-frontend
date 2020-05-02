import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  var stations = []
  const $stationInput = document.querySelector("#station-name");
  const $stationButton = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");

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
    } else if (stationName.indexOf(' ') >= 0) {
      alert(ERROR_MESSAGE.SPACE_WORD);
      return;
    } else if (/[0-9]/.test(stationName)) {
      alert(ERROR_MESSAGE.NUMBER_CONTAIN);
      return;
    } else if (stations.includes(stationName)) {
      alert(ERROR_MESSAGE.SAME_NAME);
      return;
    }
    stations.push(stationName)
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm("정말로 삭제하겠습니까?")) {
      stations.splice(stations.indexOf($target.closest(".list-item").innerText), 1);
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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
