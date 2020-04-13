export const listItemTemplate = value =>
  `<div class="list-item border border-gray-200 py-2 px-4 text-gray-800">
  ${value}
  <button class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right">
     <span class="mdi mdi-delete"></span>
  </button>
</div>`;

export const subwayLinesTemplate = line =>
  `<div class="border border-gray-200 py-2 px-4 text-gray-800 ">
  <span class="${line.bgColor} w-3 h-3 rounded-full inline-block mr-1"></span>
  ${line.title}
  <button class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right">
     <span class="mdi mdi-delete"></span>
  </button>
</div>`;

export const optionTemplate = value => `<option>${value}</option>`;

const navTemplate = `<nav class="flex items-center justify-between flex-wrap bg-yellow-500 p-6">
  <div class="flex items-center flex-shrink-0 text-gray-800 w-full">
    <span class="font-bold text-xl tracking-tight">B</span>
    <div class="w-full block flex-grow flex items-center w-auto">
      <div class="text-sm lg:flex-grow ml-4">
        <a href="/stations.html" class="block inline-block lg:mt-0 text-gray-800 hover:text-white mr-4">
          역 관리
        </a>
        <a href="/lines.html" class="block inline-block lg:mt-0 text-gray-800 hover:text-white mr-4">
          노선 관리
        </a>
        <a href="/edges.html" class="block inline-block lg:mt-0 text-gray-800 hover:text-white mr-4">
          구간 관리
        </a>
      </div>
    </div>
  </div>

</nav>`;

export const subwayLinesItemTemplate = line => {
  const stationsTemplate = line.stations
    .map(station => listItemTemplate(station))
    .join("");
  return `<div class="inline-block w-1/2 px-2">
            <div class="rounded-sm w-full slider-list overflow-y-auto">
              <div class="border ${line.bgColor} lint-title  px-4 py-1">${line.title}</div>
              ${stationsTemplate}
            </div>
          </div>`;
};

export const initNavigation = () => {
  document.querySelector("body").insertAdjacentHTML("afterBegin", navTemplate);
};

export const colorSelectOptionTemplate = (option, index) => {
  const hasNewLine = ++index % 7 === 0;

  return ` <button data-color="${
    option.bgColor
  }" class="color-select-option button w-6 h-6 ${option.bgColor} ${
    option.hoverColor
  } font-bold p-1 rounded">
             </button> ${hasNewLine ? "<br/>" : ""}`;
};
