import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";

//Takes the interviewer's properties and displays the specific interviewer
export default function interviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classnames("interviewers__item", {
    "interviwers__item--selected": selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={setInterviewer}
      selected={selected}
    >
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
}
