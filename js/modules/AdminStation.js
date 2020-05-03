import { ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationList = document.querySelector("#station-list");
  const $stationAddButton = document.querySelector("#station-add-btn")


  const onAddStationHandler = event => {
    let duplicatedCount = 0;
    if (event.key !== KEY_TYPE.ENTER && event.target !== $stationAddButton) {
      return;
    }
    event.preventDefault();
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    const regExp = /[0-9]/;
    if (!stationName || !stationName.trim()) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    if (regExp.test(stationName)) {
      alert(ERROR_MESSAGE.CONTAIN_NUMBER);
      return;
    }
    $stationList.childNodes.forEach(node => {
      if (node.innerText === stationName) {
        duplicatedCount++;
      }
    });

    if (duplicatedCount !== 0) {
      alert(ERROR_MESSAGE.DUPLICATE_NAME);
      return;
    }
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    const userAnswer = confirm("정말로 역 이름을 삭제 하실건가요? 😅");
    if (userAnswer && isDeleteButton ) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
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
