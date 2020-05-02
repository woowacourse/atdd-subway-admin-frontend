export const EVENT_TYPE = {
  CLICK: "click",
  KEY_PRESS: "keypress"
};

export const WARNING_MESSAGE = {
  STATION_DELETE_CONFIRM: "정말로 삭제하시겠습니까?"
};

export const ERROR_MESSAGE = {
  NOT_EMPTY: "🤔 값을 입력해주세요",
  DUPLICATED: "😩 동일한 이름의 역이 존재합니다. 다시 입력해주세요. 다시 입력해주세요.",
  NOT_ALLOWED_CHARACTER: "😡 허용되지 않은 문자열(공백 또는 숫자)이 입력되었습니다. 다시 입력해주세요."
};

export const KEY_TYPE = {
  ENTER: "Enter"
};

export const STATION_NAME_PATTERN = new RegExp(/^[^\d\s]+$/);
