import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show.js";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

//Index for appointments. Shows the time, if there's and interview schedule then shows
//the student and interviewer, otherwise it will show the empty appointment slot.
export default function Appointment(props) {
  //Variables for the transition
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  //Destructuring/importing the custom hook
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Functions for each Transition within the app
  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onSave = () => transition(SHOW);
  const onLoad = () => transition(SAVING);
  const onDelete = () => transition(DELETING);
  const onEmpty = () => transition(EMPTY);
  const onConfirm = () => transition(CONFIRM);
  const onEdit = () => transition(EDIT);

  console.log("INDEX ====>", props);

  //Function to save an appointment, takes in two arguments, name of student and interviewer details
  //It transitions to the loading screen (SAVING ln63, within the Status view.), then books the interview, then transitions to the SHOW page.
  function saveAppt(name, interviewer) {
    onLoad();

    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(props.id, interview).then(() => onSave());
  }

  function deleteAppt() {
    onDelete();
    props.cancelInterview(props.id).then(() => onEmpty());
  }

  function editAppt() {
    console.log("in edit mode");
    onEdit();
  }

  // console.log(props);
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {/* This is for displaying empty appt */}
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {/* This is for showing a booked appt */}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onConfirm}
            onEdit={editAppt}
          />
        )}
        {/* This is wanting to create an appt */}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={onCancel}
            onSave={saveAppt}
          />
        )}
        {/* When saving, a message is displayed */}
        {mode === SAVING && <Status message={"Saving Appointment"}></Status>}
        {/* Before deleting, asking the client to confirm their action */}
        {mode === CONFIRM && (
          <Confirm
            onCancel={onCancel}
            onConfirm={deleteAppt}
            message={"Are you sure you want to delete this appointment?"}
          ></Confirm>
        )}
        {/* When deleting, a message is displayed */}
        {mode === DELETING && (
          <Status message={"Deleting the Appointment."}></Status>
        )}
        {/* When editing the appt, the form appears with the prefilled data(from the props) so the client can edit it. */}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={onCancel}
            onSave={saveAppt}
          ></Form>
        )}
      </article>
    </>
  );
}
