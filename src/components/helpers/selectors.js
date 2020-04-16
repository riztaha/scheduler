// export const getAppointmentsForDay = (state, day) => {
//   const selectedDay = state.find((obj) => obj.name === day);
//   const getAppts = selectedDay.appointments;
//   if (getAppts === undefined) return [];
//   else return getAppts;
// };

//will return an array of appointments for that day eg [ {id:1, time: 12pm, interview: {student: name, interviewer: 3}}, {}. ...]
export function getAppointmentsForDay(state, day) {
  const filter = [];
  state.days.forEach((obj) => {
    if (obj.name === day) {
      obj.appointments.forEach((id) => {
        filter.push(state.appointments[id]);
      });
    }
  });
  return filter;
}

// will return an object with interview data when the object passed through
//contains interviewer's ID
export function getInterview(state, interview) {
  //   console.log(state);
  if (!interview) {
    return null;
  } else {
    // let tmp = state.interviewers[interview.interviewer];
    // return { ...interview, tmp };
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
    };
  }
}
