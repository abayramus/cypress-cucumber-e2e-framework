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
