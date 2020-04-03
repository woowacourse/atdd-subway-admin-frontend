export const listItemTemplate = value =>
  `<div class="list-item border border-gray-200 py-2 px-4 text-gray-800">
  ${value}
  <button class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right">
     <span class="mdi mdi-delete"></span>
  </button>
</div>`

export const optionTemplate = value => `<option>${value}</option>`

const navTemplate = `<nav class="flex items-center justify-between flex-wrap bg-yellow-500 p-6">
  <div class="flex items-center flex-shrink-0 text-gray-800 mr-6">
    <span class="font-bold text-xl tracking-tight">Brown</span>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="/stations.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-white mr-4">
        지하철역 관리
      </a>
      <a href="/lines.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-white mr-4">
        노선 관리
      </a>
      <a href="/sections.html" class="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-white mr-4">
        구간 관리
      </a>
    </div>
  </div>
</nav>`

export const subwayLinesItemTemplate = line => {
  const stationsTemplate = line.stations.map(station => listItemTemplate(station)).join('')
  return `<div class="inline-block w-1/2 px-2">
            <div class="rounded-sm w-full">
              <div class="border ${line.colorClass} lint-title  px-4 py-1">${line.title}</div>
              ${stationsTemplate}
            </div>
          </div>`
}

export const initNavigation = () => {
  document.querySelector('body').insertAdjacentHTML('afterBegin', navTemplate)
}
