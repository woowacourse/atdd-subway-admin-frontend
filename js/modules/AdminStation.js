import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
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
    } else if (stationName.includes(" ")) {
      alert(ERROR_MESSAGE.NOT_INCLUDE_SPACE)
      return;
    } else if (hasNumber(stationName)) {
      alert(ERROR_MESSAGE.NOT_HAVE_NUMBER);
      return;
    } else if (isDuplicated(stationName)) {
      alert(ERROR_MESSAGE.NOT_DUPLICATED);
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  function hasNumber(name) {
    return /\d/.test(name);
  }

  function isDuplicated(name) {
    const items = Array.from(document.querySelector("#station-list").childNodes);
    for (let i = 0; i < items.length; i++) {
      if (items[i].innerText === name) {
        return true;
      }
    }
    return false;
  }

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm("정말 삭제하시겠습니까?")) {
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
