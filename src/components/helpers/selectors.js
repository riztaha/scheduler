// export const getAppointmentsForDay = (state, day) => {
//   const selectedDay = state.find((obj) => obj.name === day);
//   const getAppts = selectedDay.appointments;
//   if (getAppts === undefined) return [];
//   else return getAppts;
// };

//will return an array of appointments for that day

export default function getAppointmentsForDay(state, day) {
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
