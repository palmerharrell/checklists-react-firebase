import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/normalize.css";
import "./css/mobile.css";
import "./css/desktop.css";

render(<Router />, document.querySelector("#main"));
