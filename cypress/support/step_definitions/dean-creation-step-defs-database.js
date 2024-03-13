const {
  Given,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
let userData;
let databaseData; // Variable to store the database query result

before(() => {
  cy.fixture("register-data").then((data) => {
    userData = data;
  });
});

Given("user connects to the application database and gets the column {string} from the table {string}", (columnName,tableName) => {
  cy.task("connectDB", "select "+columnName+" from "+tableName+"").then((data) => {
    databaseData = data.rows; // Storing the query result in the variable
  });
});

Then("verify the following exist in the database username {string}, ssn {string}, phone number {string}",
  (expectedUsername, expectedSsn, expectedPhoneNumber) => {
    // Using 'databaseData' to perform the verification
    expect(
      databaseData.some(
        (user) =>
          user.username === expectedUsername &&
          user.ssn === expectedSsn &&
          user.phone_number === expectedPhoneNumber
      )
    ).to.be.true;
  }
);