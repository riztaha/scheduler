import React from "react";
import "./InterviewerList.scss";
import "./InterviewerListItem.js";
import InterviewerListItem from "./InterviewerListItem.js";

//Takes each interviewer and puts them in a list, then displays the list of interviewers.
export default function InterviewerList(props) {
  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event) => props.onChange(interviewer.id)}
      ></InterviewerListItem>
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}
