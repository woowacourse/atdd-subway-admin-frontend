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
    const stationList = [].map.call(document.querySelectorAll(".list-item"), e=>e.innerText);
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    console.log(stationList)
    for (const stationListElement of stationList) {
      if (stationName === stationListElement) {
        alert("동일한 이름의 역이 존재합니다.");
        return;
      }
    }
    const nameCondition = /^([^0-9^\s])+$/;
    if (!stationName.match(nameCondition)) {
      alert("역 이름에는 공백 및 숫자가 들어갈 수 없습니다.");
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      const removeConfirm = confirm("정말 삭제하시겠습니까?");
      if (removeConfirm) {
        $target.closest(".list-item").remove();
      }
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
