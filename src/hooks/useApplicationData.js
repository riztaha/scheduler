import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8001";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 5,
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

  //helper function to calculate spots when given the day, and list of appointments
  const calcSpots = (day, appointments) =>
    day.appointments.length -
    day.appointments.reduce(
      (spots, id) => (appointments[id].interview ? spots + 1 : spots),
      0
    );

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    //Whenever someone books an interivew, the days function calcs if there is an appointment-id for that day, then returns
    //the day and the spots for that day.
    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: calcSpots(day, appointments) };
      }
      return day;
    });
    //Placing data in the database
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      //setting the state once it's placed the data in the database.
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: calcSpots(day, appointments) };
      }
      return day;
    });

    return axios.delete(`api/appointments/${id}`).then((res) => {
      setState({ ...state, appointments, days });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
