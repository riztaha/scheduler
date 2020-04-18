import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8001";

export default function useApplicationData() {
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

    //Placing data in the database
    return axios({
      method: `PUT`,
      url: `/api/appointments/${id}`,
      data: { interview },
    }).then((res) => {
      //setting the state once it's placed the data in the database.
      //   console.log(res);
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
  return { state, setDay, bookInterview, cancelInterview };
}
