import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show.js";
import Empty from "./Empty";

//Index for appointments. Shows the time, if there's and interview schedule then shows
//the student and interviewer, otherwise it will show the empty appointment slot.
export default function Appointment(props) {
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {props.interview ? (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
          />
        ) : (
          <Empty />
        )}
      </article>
    </>
  );
}
