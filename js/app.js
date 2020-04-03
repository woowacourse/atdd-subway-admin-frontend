import { EVENT_TYPE } from '../utils/constants.js'
import { stationListTemplate } from '../utils/templates.js'

function App() {
  const $stationAddButton = document.querySelector('#station-add-btn')
  $stationAddButton.addEventListener(EVENT_TYPE.CLICK, event => {
    event.preventDefault()
    const $stationNameInput = document.querySelector('#station-name')
    const stationName = $stationNameInput.value
    $stationNameInput.value = ''
    document.querySelector('#station-list').insertAdjacentHTML('beforeend', stationListTemplate(stationName))
  })

  document.querySelector('#station-list').addEventListener(EVENT_TYPE.CLICK, event => {
    event.target.closest('.station-list-item').remove()
  })
}

new App()
