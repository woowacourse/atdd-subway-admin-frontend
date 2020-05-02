import { EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE } from "../../utils/constants.js";
import { listItemTemplate } from "../../utils/templates.js";
import { WrongUserInputException} from "../../utils/exceptions.js"

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");  // 역 이름 입력하는 input 임
  const $stationList = document.querySelector("#station-list");
  const $stationAddButoon = document.querySelector("#station-add-btn");

  const validateStationName = function (stationName) {
    if (isStationNameOnlyBlanks(stationName)) {
        throw new WrongUserInputException(ERROR_MESSAGE.ONLY_BLANKS);
    }
    if (isStationNameEmpty(stationName)) {
      throw new WrongUserInputException(ERROR_MESSAGE.NOT_EMPTY);
    }
  }

  const isStationNameEmpty = function (stationName) {
    if (!stationName) {
      return true;
    }
    return false;
  }

  const isStationNameOnlyBlanks = function (stationName) {
    const blank_pattern = /^\s+|\s+$/g;
    if(stationName.replace( blank_pattern, '' ) == "" ) {
      return true;
    }
    return false;
  }

  /**
   * 역 이름 등록할 때 (by submit button)
   */
  const onAddStationHandler = event => {
    event.preventDefault();    // 이벤트의 기본동작을 취소한다. (?!)
    const $stationNameInput = document.querySelector("#station-name");  // 5번줄이랑 중복인데... 왜지?
    const stationName = $stationNameInput.value;
    $stationNameInput.value = "";  // 역 이름 입력창을 비워줌.
    try {
      validateStationName(stationName);
    } catch (e) {
      alert(e.message);
      return;
    }
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName)); // 역이름 입력 결과 태그 추가
  };
  
  /**
   * 역 이름 입력하고 enter 눌렀을 때
   */
  const onAddStationByEnterHandler = event => {
    if (event.key !== KEY_TYPE.ENTER) {
      return;
    }
    onAddStationHandler(event);
  }
  
  /**
   * 입력된 다음에 delete 버튼이 생기는듯? 그거로 아이템지우는 거
   */
  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      $target.closest(".list-item").remove();
    }
  };

  /**
   * 앞서 정의한 이벤트를 등록하기 위한 메서드
   */
  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationByEnterHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
    $stationAddButoon.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler)
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
