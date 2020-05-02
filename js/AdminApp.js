/* 모든 html 페이지에서 다 호출된다. */

import { initNavigation } from "../utils/templates.js"; // templates.js 의 initNavigation 함수 import

function AdminApp() {
  const init = () => {
    initNavigation();
  };

  return {
    init
  };
}

// 아래랑 위가 뭐가 다르지??

// function AdminApp() {
//   this.init = () => {
//     initNavigation();
//   };
// }

const adminApp = new AdminApp();
adminApp.init();
