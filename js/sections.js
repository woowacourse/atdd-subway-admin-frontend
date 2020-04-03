import { optionTemplate, initNavigation, subwayLinesItemTemplate } from '../utils/templates.js'
import { defulatSubwayLines } from '../utils/subwayMockData.js'
import tns from '../lib/slider/tiny-slider.js'
import { EVENT_TYPE } from '../utils/constants.js'

function Sections() {
  const $subwayLinesSlider = document.querySelector('.subway-lines-slider')

  const initSubwayLinesSlider = () => {
    $subwayLinesSlider.innerHTML = defulatSubwayLines.map(line => subwayLinesItemTemplate(line)).join('')
    tns({
      container: '.subway-lines-slider',
      loop: true,
      items: 2,
      nav: false,
      slideBy: 'page',
      speed: 400,
      autoplayButtonOutput: false,
      mouseDrag: true,
      lazyload: true,
      controlsContainer: '#slider-controls'
    })
  }

  const initSubwayLineOptions = () => {
    const subwayLineOptionTemplate = defulatSubwayLines.map(line => optionTemplate(line.title)).join('')
    const $stationSelectOptions = document.querySelector('#station-select-options')
    $stationSelectOptions.insertAdjacentHTML('afterbegin', subwayLineOptionTemplate)
  }

  const onRemoveStationHandler = event => {
    const $target = event.target
    const isDeleteButton = $target.classList.contains('mdi-delete')
    if (isDeleteButton) {
      $target.closest('.list-item').remove()
    }
  }

  const initEventListeners = () => {
    $subwayLinesSlider.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler)
  }

  this.init = () => {
    initNavigation()
    initSubwayLinesSlider()
    initSubwayLineOptions()
    initEventListeners()
  }
}

const section = new Sections()
section.init()
