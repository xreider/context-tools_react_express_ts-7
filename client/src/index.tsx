import React from "react";
import ReactDOM from "react-dom/client";

import App from "components/App/App";

// import "tippy.js/dist/tippy.css";
import "hooks/init/useLangOfInterface";
import "styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
