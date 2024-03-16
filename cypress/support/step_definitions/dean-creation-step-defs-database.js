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
    console.log(databaseData)
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


Given('create a new dean with the following details', (dataTable) => {
  // Assuming dataTable is used to pass dean details. Convert it to an object if necessary.
  const deanDetails = dataTable.rowsHash(); // If you're passing the dean details in a table format in the feature file
  
  // calling createDeanDB from cypress.config.ts.. due to permission, we get permission error, but code is good
  cy.task('createDeanDB', deanDetails).then((dean) => {
    console.log('New dean created:', dean);
  });
});
