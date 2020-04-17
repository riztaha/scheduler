import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show.js";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

//Index for appointments. Shows the time, if there's and interview schedule then shows
//the student and interviewer, otherwise it will show the empty appointment slot.
export default function Appointment(props) {
  //Variables for the transition
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  //Destructuring/importing the custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Functions for each Transition within the app
  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onSave = () => transition(SHOW);
  const onLoad = () => transition(SAVING);

  // console.log("INDEX ====>", props);

  //Function to save an appointment, takes in two arguments, name of student and interviewer details
  //It transitions to the loading screen (SAVING ln63, within the Status view.), then books the interview, then transitions to the SHOW page.
  function save(name, interviewer) {
    onLoad();

    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview).then(() => onSave());
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
        {mode === SAVING && <Status message={"Saving Appointment"}></Status>}
      </article>
    </>
  );
}
