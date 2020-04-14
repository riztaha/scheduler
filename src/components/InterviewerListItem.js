import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function interviewerList(props) {
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src="https://i.imgur.com/LpaY82x.png"
        alt="Sylvia Palmer"
      />
      Sylvia Palmer
    </li>
  );
}
