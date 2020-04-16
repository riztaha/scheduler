import { useState } from "react";

export default function useVisualMode(initial) {
  //sets the initial mode as the given parameter and returns it
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition function within useVisualMode that will take in a new mode and update the mode state with the new value.
  const transition = (nextMode) => {
    setMode(nextMode);
    setHistory((el) => [...el, nextMode]);
  };

  //back function needs to keep track so we make a history array, whenever someone
  //tranistions, it is kept in track via history array.
  //el are the elements in the history array, el.length-1 is the last index (last item, last thing in history)
  const back = () => {
    if (history.length > 1) {
      setHistory((el) => {
        el.pop();
        setMode(el[el.length - 1]);
        return el;
      });
    }
  };

  return { mode, transition, back };
}
