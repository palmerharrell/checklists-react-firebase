import React from "react";
import { render } from "react-dom";
import Router from "./components/Router";
import "./css/normalize.css";
import "./css/style.css";
import "./css/desktop.css";

render(<Router />, document.querySelector("#main"));
