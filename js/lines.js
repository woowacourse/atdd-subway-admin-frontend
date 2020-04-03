import { EVENT_TYPE } from '../utils/constants.js'
import { listItemTemplate, initNavigation } from '../utils/templates.js'
import { defulatSubwayLines } from '../utils/subwayMockData.js'

function SubwayLineApp() {
  const $subwayLineList = document.querySelector('#subway-line-list')
  const $stationAddButton = document.querySelector('#subway-line-add-btn')

  const onAddSubwayLineHandler = event => {
    event.preventDefault()
    const $subwayLineNameInput = document.querySelector('#subway-line-name')
    const subwayLineName = $subwayLineNameInput.value
    if (!subwayLineName) {
      return
    }
    $subwayLineNameInput.value = ''
    $subwayLineList.insertAdjacentHTML('beforeend', listItemTemplate(subwayLineName))
  }

  const onRemoveStationHandler = event => {
    const $target = event.target
    const isDeleteButton = $target.classList.contains('mdi-delete')
    if (isDeleteButton) {
      $target.closest('.list-item').remove()
    }
  }

  const initDefaultSubwayLines = () => {
    defulatSubwayLines.map(line => {
      $subwayLineList.insertAdjacentHTML('beforeend', listItemTemplate(line.title))
    })
  }

  const initEventListeners = () => {
    $subwayLineList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler)
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddSubwayLineHandler)
  }

  this.init = () => {
    initNavigation()
    initDefaultSubwayLines()
    initEventListeners()
  }
}

const lineApp = new SubwayLineApp()
lineApp.init()
