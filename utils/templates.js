export const listItemTemplate = value =>
  `<div class="list-item border border-gray-200 py-2 px-4 text-gray-800">
  <span class="item-value">${value}</span>
  <button class="hover:bg-gray-300 hover:text-gray-500 text-gray-300 px-1 rounded-full float-right">
     <span class="mdi mdi-delete"></span>
  </button>
</div>`;

const navTemplate = `<nav class="flex items-center justify-between flex-wrap bg-yellow-500 p-4">
  <div class="flex items-center flex-shrink-0 text-gray-800 w-full">
      <a href="/" class="mr-2">
        <img src="../images/logo_small.png" class="w-6">
      </a>
    <div class="flex justify-start">
      <div class="hover:bg-yellow-400 px-2 py-1 rounded">
         <a href="/admin-station.html" class="block inline-block lg:mt-0 text-gray-800 text-sm">
          역 관리
          </a>
      </div>
      <div class="hover:bg-yellow-400 px-2 py-1 rounded">
         <a href="/admin-line.html" class="block inline-block lg:mt-0 text-gray-800 text-sm">
          노선 관리
          </a>
      </div>
      <div class="hover:bg-yellow-400 px-2 py-1 rounded">
          <a href="/admin-edge.html" class="block inline-block lg:mt-0 text-gray-800 text-sm">
          구간 관리
          </a>
      </div>
    </div>
</nav>`;

export const initNavigation = () => {
  document.querySelector("body").insertAdjacentHTML("afterBegin", navTemplate);
};
