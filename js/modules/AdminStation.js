import { ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationButton = document.querySelector("#station-add-btn");

  const onAddStationHandler = event => {
    if ((event.type === EVENT_TYPE.KEY_PRESS && event.key !== KEY_TYPE.ENTER)) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    const regExp = /[0-9]/;

    const every = document.querySelectorAll(".list-item");
    for (let i = 0; i < every.length; i++) {
      if (every[i].innerText === stationName) {
        alert("동일한 이름의 역은 추가할 수 없습니다.")
        return;
      }
    }
    $stationNameInput.value = "";
    if (!stationName || Number(stationName) || regExp.test(stationName)) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };


  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    const userInput = confirm("삭제하시겠습니까?");
    if (isDeleteButton && userInput) {
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
