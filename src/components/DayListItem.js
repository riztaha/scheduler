import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

//Sets the class for the day and returns the name and how many spots are available for the day.
export default function DayListItem(props) {
  //Fn for showing how many spots are remaining
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  };

  //Fn for changing the className depending on how many spots are available.
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
