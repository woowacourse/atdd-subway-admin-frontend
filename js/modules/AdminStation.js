import {EVENT_TYPE, ERROR_MESSAGE, KEY_TYPE, MAGIC_NUMBER, REGEX, NODE_NAME} from "../../utils/constants.js";
import {listItemTemplate} from "../../utils/templates.js";

function AdminStation() {
    const $stationInput = document.querySelector("#station-name");
    const $stationList = document.querySelector("#station-list");
    const $stationAddBtn = document.querySelector("#station-add-btn");

    const enterAddStation = event => {
        if (event.key !== KEY_TYPE.ENTER) {
            return;
        }
        onAddStationHandler(event);
    };

    const clickAddStationBtn = event => {
        onAddStationHandler(event);
    };

    const validateInput = (input) => {
        validateEmpty(input);
        validateNumber(input);
        validateSpace(input);
        validateSameStation(input);
    };

    const validateSameStation = input => {
        if (isSameStation(input)) {
            throw ERROR_MESSAGE.SAME_STATION_NAME;
        }
    }

    const validateNumber = input => {
        if (containsNumber(input)) {
            throw ERROR_MESSAGE.NUMBER;
        }
    }

    const validateSpace = input => {
        if (containsSpace(input)) {
            throw ERROR_MESSAGE.SPACE;
        }
    }

    const validateEmpty = input => {
        if (isEmpty(input)) {
            throw ERROR_MESSAGE.EMPTY;
        }
    }

    const containsNumber = input => {
        return REGEX.NUMBER.test(input);
    }

    const containsSpace = input => {
        return input.indexOf(REGEX.SPACE) > MAGIC_NUMBER.NOT_EXIST;
    }

    const isEmpty = input => {
        return input.length === 0;
    }

    const isSameStation = input => {
        let texts = convertToTexts($stationList.childNodes);
        return texts.includes(input);
    };

    const convertToTexts = nodes => {
        let texts = [];
        for (let node of nodes) {
            texts.push(node.textContent.trim());
        }
        return texts;
    }

    const onAddStationHandler = event => {
        event.preventDefault();
        const $stationNameInput = document.querySelector("#station-name");
        const stationName = $stationNameInput.value;
        try {
            validateInput(stationName)
        } catch (e) {
            alert(e);
            return;
        }
        $stationNameInput.value = "";
        $stationList.insertAdjacentHTML("beforeend", listItemTemplate(stationName));
    };

    const onRemoveStationHandler = event => {
        const $target = event.target;
        if ($target && $target.nodeName !== NODE_NAME.BUTTON && $target.nodeName !== NODE_NAME.SPAN) {
            return;
        }
        if (!confirm("정말로 삭제하시겠습니까?")) {
            return;
        }
        const isDeleteButton = $target.classList.contains("mdi-delete");
        if (isDeleteButton) {
            $target.closest(".list-item").remove();
        }
    };

    const initEventListeners = () => {
        $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, enterAddStation);
        $stationAddBtn.addEventListener(EVENT_TYPE.CLICK, clickAddStationBtn);
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
