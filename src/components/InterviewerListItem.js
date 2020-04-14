import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";

export default function interviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classnames("interviewers__item", {
    "interviwers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
