import React from "react";
import "./InterviewerList.scss";
import "./InterviewerListItem.js";
import InterviewerListItem from "./InterviewerListItem.js";

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

  console.log(listInterviewers);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}
