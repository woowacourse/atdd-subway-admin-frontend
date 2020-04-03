import { EVENT_TYPE } from '../utils/constants.js'
import { listItemTemplate, initNavigation } from '../utils/templates.js'

function StationsApp() {
  const $stationAddButton = document.querySelector('#station-add-btn')
  const $stationList = document.querySelector('#station-list')

  const onAddStationHandler = event => {
    event.preventDefault()
    const $stationNameInput = document.querySelector('#station-name')
    const stationName = $stationNameInput.value
    if (!stationName) {
      return
    }
    $stationNameInput.value = ''
    $stationList.insertAdjacentHTML('beforeend', listItemTemplate(stationName))
  }

  const onRemoveStationHandler = event => {
    const $target = event.target
    const isDeleteButton = $target.classList.contains('mdi-delete')
    if (isDeleteButton) {
      $target.closest('.station-list-item').remove()
    }
  }

  const initEventListeners = () => {
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler)
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler)
  }

  this.init = () => {
    initNavigation()
    initEventListeners()
  }
}

const stations = new StationsApp()
stations.init()
