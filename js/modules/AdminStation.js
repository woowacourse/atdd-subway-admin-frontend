import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  //myCode
  const $stationInputButton = document.querySelector("#station-add-btn");

  const onAddStationHandler = event => {
    //myCode
    if (event.key !== KEY_TYPE.ENTER && event.type !== "click") {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }

    if (stationName.includes(" ")) {
      alert(ERROR_MESSAGE.NOT_BLANK);
      return;
    }
    //myCode
    if (/\d/.test(stationName)) {
      alert(ERROR_MESSAGE.NOT_NUMBER);
      return;
    }
    //myCode
    if (duplicatedName(stationName)) {
      alert(ERROR_MESSAGE.NOT_DUPLICATED);
      return;
    }

    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  //myCode
  function duplicatedName(input) {
    const names = document.querySelectorAll(".list-item");
    const namesArr = Array.from(names);

    return namesArr.some(element => {
      return element.innerText === input;
    });
  }

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    //myCode
    if (isDeleteButton && confirm("정말 삭제하시겠습니까?")) {
      $target.closest(".list-item").remove();
    }
  };


  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
    //myCode
    $stationInputButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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
