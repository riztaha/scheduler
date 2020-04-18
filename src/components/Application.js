import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors.js";
// import useVisualMode from "hooks/useVisualMode.js";
// import Empty from "./Appointment/Empty.js";

axios.defaults.baseURL = "http://localhost:8001";

//Main application for the app

//React function that renders the whole app together.
export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const appointmentsArr = getAppointmentsForDay(state, state.day);
  const interviewersArr = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Placing it in the db
    return axios({
      method: `PUT`,
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((res) => {
      //setting the state once it's placed the data.
      console.log(res);
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id) {
    console.log("ID OF APPT======>", id);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios({
      method: `DELETE`,
      url: `api/appointments/${id}`,
    }).then((res) => {
      console.log(res);
      setState({ ...state, appointments });
    });
  }

  // function editInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview,
  //   }

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   }

  // return axios()
  // }

  const schedule = appointmentsArr.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    // console.log("APPLICATION 'interview' =====>", appointment.interview);
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
