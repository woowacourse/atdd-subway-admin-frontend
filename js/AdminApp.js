/* 모든 html 페이지에서 다 호출된다. */

import { initNavigation } from "../utils/templates.js"; // templates.js 의 initNavigation 함수 import
/*
function AdminApp() {
  const init = () => {
    initNavigation();
  };

  return {
    init
  };
}
*/
function AdminApp() {
  this.init = () => {
    initNavigation();
  };
}

const adminApp = new AdminApp();
adminApp.init();
