import React from "react";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.js";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"></ul>
    </section>
  );
}
