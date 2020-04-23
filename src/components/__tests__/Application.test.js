import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  debug,
} from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //Clicking the add button
    fireEvent.click(getByAltText(appointment, "Add"));

    //Adding the name of the student
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    //Adding name of Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //Clicking the save button
    fireEvent.click(getByText(appointment, "Save"));
    // debug();
    expect(getByText(appointment, "Saving Appointment")).toBeInTheDocument();

    // console.log(prettyDOM(appointment));
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

    // console.log(prettyDOM(day));
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(
        appointment,
        "Are you sure you want to delete this appointment?"
      )
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(
      getByText(appointment, "Deleting the Appointment.")
    ).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    // debug();

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => queryByText(container, "Archie Cohen"));

    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Check to see if form appears with pre-filled data.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    // 5. Change the Name of student & interviewer.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "John Doe" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Save the changes.
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Get confirmation of saving
    expect(getByText(appointment, "Saving Appointment")).toBeInTheDocument();

    // 8. See if the changes have saved.
    await waitForElement(() => getByText(appointment, "John Doe"));

    // 9. See if spots for the day have not changed.
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    // 1. Rejecting the PUT request for test purposes only once.
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);
    // 2. Seeing if the student exists
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 3. Adding a new appointment
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Jane Doe" },
    });

    // 4. Selecting interviewer and saving
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Saving appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Seeing the saving loading icon.
    expect(getByText(appointment, "Saving Appointment")).toBeInTheDocument();

    // 7. Error message received.
    await waitForElement(() => getByText(container, "Error"));

    //8. User presses the close button on the error msg.
    fireEvent.click(getByAltText(appointment, "Close"));

    //9. Expecting to see the form again with the Save button.
    expect(getByText(appointment, "Save")).toBeInTheDocument();

    //10. Day still has the same number of spots remaining.
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Rejecting the DELETE request for test purposes only once.
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);
    // 2. Seeing if the student exists
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    // 3. Clicking the delete button on the appointment
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Should see a confirmation asking to delete appointment.
    expect(
      getByText(
        appointment,
        "Are you sure you want to delete this appointment?"
      )
    ).toBeInTheDocument();

    // 5. Click the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Should see a Deleting loading status.
    expect(
      getByText(appointment, "Deleting the Appointment.")
    ).toBeInTheDocument();

    // 7. Error message should appear.
    await waitForElement(() => getByText(appointment, "Error"));

    // 8. Close error message and see the appointment again with the delete button.
    fireEvent.click(getByAltText(appointment, "Close"));
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument();

    // 9. Spots remaining for the day should not change as could not delete the appointment.
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Tuesday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
