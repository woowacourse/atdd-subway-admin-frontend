import { optionTemplate, subwayLinesItemTemplate } from "../utils/templates.js";
import { defulatSubwayLines } from "../utils/subwayMockData.js";
import tns from "../lib/slider/tiny-slider.js";
import { EVENT_TYPE } from "../utils/constants.js";

function Edges() {
  const $subwayLinesSlider = document.querySelector(".subway-lines-slider");

  const initSubwayLinesSlider = () => {
    $subwayLinesSlider.innerHTML = defulatSubwayLines
      .map(line => subwayLinesItemTemplate(line))
      .join("");
    tns({
      container: ".subway-lines-slider",
      loop: true,
      slideBy: "page",
      speed: 400,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      controlsContainer: "#slider-controls",
      responsive: {
        640: {
          items: 1,
          edgePadding: 25
        },
        768: {
          items: 1,
          edgePadding: 25
        },
        1024: {
          items: 2,
          gutter: 20,
          edgePadding: 10
        }
      }
    });
  };

  const initSubwayLineOptions = () => {
    const subwayLineOptionTemplate = defulatSubwayLines
      .map(line => optionTemplate(line.title))
      .join("");
    const $stationSelectOptions = document.querySelector(
      "#station-select-options"
    );
    $stationSelectOptions.insertAdjacentHTML(
      "afterbegin",
      subwayLineOptionTemplate
    );
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $subwayLinesSlider.addEventListener(
      EVENT_TYPE.CLICK,
      onRemoveStationHandler
    );
  };

  this.init = () => {
    initSubwayLinesSlider();
    initSubwayLineOptions();
    initEventListeners();
  };
}

const section = new Edges();
section.init();
