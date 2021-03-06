import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "../src/components/DayListItem";
import DayList from "../src/components/DayList";
import InterviewerListItem from "../src/components/InterviewerListItem";
import InterviewerList from "../src/components/InterviewerList";
import Appointment from "../src/components/Appointment/index";
import Header from "../src/components/Appointment/Header";
import Empty from "../src/components/Appointment/Empty";
import Show from "../src/components/Appointment/Show";
import Confirm from "../src/components/Appointment/Confirm";
import Status from "../src/components/Appointment/Status";
import Error from "../src/components/Appointment/Error";
import Form from "../src/components/Appointment/Form";

//Story for Button
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

//Story for DayListItem
storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

//Some dataset we're using to show us the days and how many spots are available.
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

//Stories for DayList. Clicking on the day set's the day and show's us the information for that specific day.
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));

//Dataset we're using for an interviewer.
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png",
};

//Allows someone to click on an interviewer and it will show the interviewer's name, avatar, and allows
//the student to set that interviewer they selected for the appointment.
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={(event) => action("setInterviewer")(interviewer.id)}
    />
  ));

//Dataset for list of interviewers
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
];

//Same thing as the previous storiesOf but now shows all the interviewers.
storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      interviewer={3}
      onChange={action("setInterviewer")}
    />
  ));

//Story for appointments. Appointments need to either be empty or full/shown. They need to be confirmed or have an error
//Appointments can be created or edited and finally they can booked.
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Apppointment", () => {
    return <Appointment></Appointment>;
  })
  .add("Appointment with Time", () => {
    return <Appointment time="12pm" />;
  })
  .add("Header", () => {
    return <Header time="12pm"></Header>;
  })
  .add("Empty", () => {
    return <Empty onAdd={action("onAdd")} />;
  })
  .add("Show", () => {
    return (
      <Show onEdit={action("onEdit")} onDelete={action("onDelete")}></Show>
    );
  })
  .add("Confirm", () => {
    return (
      <Confirm
        message="Delete the appointment?"
        onConfirm={action("onConfirm")}
        onCancel={action("onCancel")}
      ></Confirm>
    );
  })
  .add("Status", () => {
    return <Status message="Deleting"></Status>;
  })
  .add("Error", () => {
    return (
      <Error
        message="Could not delete appointment"
        onClose={action("onClose")}
      ></Error>
    );
  })
  .add("Form Edit", () => {
    return (
      <Form
        name="Name of Student"
        interviewers={interviewers}
        interviewer={1}
        onSave={action("onSave")}
        onCancel={action("onCancel")}
      ></Form>
    );
  })
  .add("Form Create", () => {
    return (
      <Form
        interviewers={interviewers}
        onSave={action("onSave")}
        onCancel={action("onCancel")}
      ></Form>
    );
  })
  .add("Appointment Empty", () => (
    <>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </>
  ))
  .add("Appointment Booked", () => (
    <>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </>
  ));
