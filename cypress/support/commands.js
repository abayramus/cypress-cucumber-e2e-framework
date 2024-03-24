// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const { faker } = require("@faker-js/faker");

Cypress.Commands.add("login", (email, password) => {
  //loging linkine tikla
  cy.get(".header_link.ms-2").click();
  //killanici adi gir
  cy.get("#username").type(email);
  //sifre gir
  cy.get("#password").type(password);
  //login butonuna tikla
  cy.get("button[class='fw-semibold btn btn-primary']").click();
});

// token uretmek icin gerekli olan metot
Cypress.Commands.add("generateToken", (username, password) => {
  const body = {
    username: username,
    password: password,
  };

  cy.request({
    method: "POST",
    url: "https://managementonschools.com/app/auth/login",
    body: body,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.body.token;
  });
});

//CUSTOM CODE FOR CREATING USER DATA WITH GIVEN TOKEN
//This code defines a custom Cypress command named addDean.
//This command is designed to send a POST request to the specified URL
// Cypress.Commands.add("addDean", (token, deanData) => {
//   cy.request({
//     method: "POST",
//     url: "https://managementonschools.com/app/dean/save",
//     headers: {
//       Authorization: `${token}`, // Assuming your API uses Bearer token authentication
//       "Content-Type": "application/json",
//     },
//     body: deanData,
//   });
// });

//REPLACED WITH ABOVE CODE TO MAKE THE METHOD MORE DYNAMIC
//This code defines a custom Cypress command named createUserPostRequest.
//This command is designed to send a POST request to the specified URL
// PARAMETERS ARE ASSIGNED IN THE STEP DEFINITIONS
Cypress.Commands.add("createUserPostRequest", (token, newUserData, postURL) => {
  cy.request({
    method: "POST",
    url: postURL,
    // url: 'https://managementonschools.com/app/dean/save',
    headers: {
      Authorization: `${token}`, // Assuming your API uses Bearer token authentication
      "Content-Type": "application/json",
    },
    body: newUserData,
  });
});

//This code defines a custom Cypress command named updateUserPutRequest.
//This command is designed to send a PUT request to the specified URL to replace existing dean with new values
// PARAMETERS ARE ASSIGNED IN THE STEP DEFINITIONS
Cypress.Commands.add(
  "updateUserPutRequest",
  (token, userId, deanDetails, putURL) => {
    cy.request({
      method: "PUT",
      url: `${putURL}/${userId}`,
      headers: {
        Authorization: `${token}`, // Include the token for authentication
        "Content-Type": "application/json",
      },
      body: deanDetails,
    }).then((response) => {
      // Check if the request was successful
      expect(response.status).to.equal(200);
    });
  }
);

//generated random user----
Cypress.Commands.add("generateUsers", () => {
  const user = {
    name: faker.person.firstName(), // Generates a random name
    surname: faker.person.lastName(),
    city: faker.location.city(),
    gender: faker.person.sex().toLowerCase(),
    dateOfBirth:
      faker.number.int({ min: 1900, max: 2010 }) +
      "-" +
      faker.number.int({ min: 1, max: 12 }).toString().padStart(2, "0") +
      "-" +
      faker.number.int({ min: 1, max: 28 }).toString().padStart(2, "0"),
    // phone:faker.phone.number().substring(0,12), // Generates a random phone number
    phone:
      faker.number.int({ min: 100, max: 999 }) +
      "-" +
      faker.number.int({ min: 100, max: 999 }) +
      "-" +
      faker.number.int({ min: 1000, max: 9999 }), // Generates a random phone number
    ssn:
      faker.number.int({ min: 100, max: 999 }) +
      "-" +
      faker.number.int({ min: 10, max: 99 }) +
      "-" +
      faker.number.int({ min: 1000, max: 9999 }),
    username: faker.internet.userName(),
    password: faker.internet.password({ length: 8, pattern: /^[a-zA-Z0-9]+$/ }),
    email: faker.internet.email(), // Generates a random email
    address: faker.location.streetAddress(false), // Generates a random address
  };
  console.log(user);
  return user;
});
