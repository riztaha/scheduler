import React from "react";
import DayListItem from "components/DayListItem.js";

export default function dayList(props) {
  const listDays = props.days.map((day) => {
    return (
      <DayListItem
        key={props.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{listDays}</ul>;
}
