import { initNavigation } from "../utils/templates.js";

function SubwayAdminApp() {
  const init = () => {
    initNavigation();
  };

  return {
    init
  };
}

const subwayAdminApp = new SubwayAdminApp();
subwayAdminApp.init();
