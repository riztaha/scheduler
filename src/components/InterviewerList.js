import React from "react";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.js";
import interviewerListItem from "components/InterviewerListItem.js";

export default function InterviewerList(props) {
  const listInterviewers = props.interviewers.map((interviewer) => {
    return (
      <interviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      ></interviewerListItem>
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}
