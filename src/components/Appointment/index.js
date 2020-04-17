import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show.js";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

//Index for appointments. Shows the time, if there's and interview schedule then shows
//the student and interviewer, otherwise it will show the empty appointment slot.
export default function Appointment(props) {
  //Variables for the transition
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //Destructuring/importing the custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Functions for each
  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onSave = () => transition(SHOW);
  console.log("INDEX ====>", props);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview);

    onSave();
  }

  // console.log(props);
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={onCancel}
            onSave={save}
          />
        )}
      </article>
    </>
  );
}
