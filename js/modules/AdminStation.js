import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");

  function checkDuplication(value) {
    console.log(value)
    for(let i=0; i < $stationList.getElementsByTagName('div').length; i++) {
      if ($stationList.getElementsByTagName('div')[i].innerText === value) {
        return true;
      }
    }
    return false;
  }

  const onAddStationHandler = event => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value.trim();
    const numberRegex = RegExp(/[0-9]/)
    const spaceRegex = RegExp(/\s/)
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    if (checkDuplication(stationName)) {
      alert(ERROR_MESSAGE.DUPLICATED_NAME)
      $stationNameInput.value = "";
      return;
    }
    if (numberRegex.test(stationName)) {
      alert(ERROR_MESSAGE.CONTAIN_NUMBER)
      $stationNameInput.value = "";
      return;
    }
    if (spaceRegex.test(stationName)) {
      alert(ERROR_MESSAGE.CONTAIN_SPACE)
      $stationNameInput.value = "";
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    console.log(event)
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton && confirm('정말로 삭제하시겠습니까?')) {
      $target.closest(".list-item").remove();
      alert('역을 삭제했습니다.')
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
