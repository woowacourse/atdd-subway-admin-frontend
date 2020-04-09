import { initNavigation } from "../utils/templates.js";

function SubwayApp() {
  const init = () => {
    initNavigation();
  };

  return {
    init
  };
}

const subwayApp = new SubwayApp();
subwayApp.init();
