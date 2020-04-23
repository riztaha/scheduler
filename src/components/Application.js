import React from "react";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";

//React function that renders the whole app together.
export default function Application(props) {
  //Importing the states/functions from useApplicationData.js
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();

  //Variable for the functions for readability purposes.
  const appointmentsArr = getAppointmentsForDay(state, state.day);
  const interviewersArr = getInterviewersForDay(state, state.day);

  //The schedule which displays on the app, it needs to map through all the appts and for each appt
  //it retrieves the interview data. It then sends all the data for the appt down to the Appointment form as props.
  const schedule = appointmentsArr.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArr}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            key={state.id}
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
