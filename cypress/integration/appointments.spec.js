describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });
  it("should book an interview", () => {
    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]").first().click();
    // Enters their name
    cy.get("[data-testid=student-name-input]").type(
      "Dwayne 'The Rock' Johnson"
    );
    // Chooses an interviewer
    cy.get("[alt='Tori Malcolm']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the booked appointments
    cy.contains(".appointment__card--show", "Dwayne 'The Rock' Johnson");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should edit an interview", () => {
    // Clicks the edit button for the existing appointment
    cy.get("[alt=Edit]").first().click({ force: true });
    // Changes the name and interviewer
    cy.get("[data-testid=student-name-input]").clear().type("John Doe");
    cy.get("[alt='Tori Malcolm']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the edit to the appointment
    cy.contains(".appointment__card--show", "John Doe");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // Clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").first().click({ force: true });

    // Clicks the confirm button
    cy.contains("Confirm").click();

    // Does it see the deleting loading status?
    cy.contains("Deleting").should("exist");

    // Has the deleting loading status finished/removed from the screen?
    cy.contains("Deleting").should("not.exist");

    // Sees that the appointment slot is empty
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
