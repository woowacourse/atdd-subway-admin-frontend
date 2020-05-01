import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");

  const onAddStationHandler = (event) => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;

    if (!checkName(stationName)) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    if (checkDuplicate(stationName)) {
      alert("중복되는 역 이름입니다.");
      return;
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = (event) => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");

    if(event.target && event.target.nodeName !== "SPAN") {
      return;
    }

    if (confirm("정말 삭제하시겠습니까?")) {
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
    init,
  };
}

function checkName(stationName) {
  const regExp = /^[^\d\s]+$/;
  return regExp.test(stationName);
}

function checkDuplicate(stationName) {
  let flag = false;
  const parent = document.getElementById("station-list");
  const child = parent.childNodes;
  child.forEach((div) => {
    const title = div.textContent.trim();
    if (title === stationName) {
      flag = true;
      return;
    }
  });
  return flag;
}

const adminStation = new AdminStation();
adminStation.init();
