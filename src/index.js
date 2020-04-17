import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";
// import useVisualMode from "components/hooks/useVisualMode";

ReactDOM.render(<Application />, document.getElementById("root"));

// const EMPTY = "EMPTY";
// const SHOW = "SHOW";
// const { mode, transition, back } = useVisualMode(
//   props.interview ? SHOW : EMPTY
// );
