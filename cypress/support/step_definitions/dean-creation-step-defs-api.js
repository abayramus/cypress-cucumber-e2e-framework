const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
let loginData;
let userData;

before(() => {
  cy.fixture("creds").then((data) => {
    loginData = data;
  });
  // register datalari
  cy.fixture("register-data").then((data) => {
    userData = data;
  });
});

Given("user has a valid authentication token", () => {
  cy.generateToken(loginData[0].username, loginData[0].password).as(
    "authToken"
  );
  // console.log(authToken);
});

When(
  "the API response should indicate status code {string} for get URL {string}",
  (statusCode, getURL) => {
    cy.get("@authToken").then((token) => {
      // console.log(token);

      cy.request({
        method: "GET",
        url: getURL,
        headers: {
          Authorization: `${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(parseInt(statusCode));
        console.log(response.body);
      });
    });
  }
);
Then(
  "verify the dean creation is successful for username {string}, ssn {string}, phone number {string}",
  (expectedUsername, expectedSsn, expectedPhoneNumber) => {
    cy.get("@authToken").then((token) => {
      // console.log(token);

      cy.request({
        method: "GET",
        url: loginData[0].deanGetURL,
        headers: {
          Authorization: `${token}`,
        },
      }).then((response) => {
        console.log("++++" + expectedUsername);

        expect(
          response.body.some(
            (user) =>
              user.username === expectedUsername &&
              user.ssn === expectedSsn &&
              user.phoneNumber === expectedPhoneNumber
          )
        ).to.be.true;
      });
    });
  }
);

Then(
  "create a new dean and verify creation successful for username {string}, ssn {string}, phone number {string}, name {string}, surname {string}, birthday {string}, birth place {string}, gender {string}, password {string}",
  (
    username,
    ssn,
    phoneNumber,
    name,
    surname,
    birthday,
    birthPlace,
    gender,
    password
  ) => {
    cy.get("@authToken").then((authToken) => {
      // Prepare Dean data to get from the JSON DATA FILES
      // const deanData = {
      //   birthDay: registrationData[0].dateOfBirth,
      //   birthPlace: registrationData[0].city,
      //   gender: registrationData[0].genderMale,
      //   name: registrationData[0].deanName,
      //   password: registrationData[0].password,
      //   phoneNumber: registrationData[0].phone,
      //   ssn: registrationData[0].ssn,
      //   surname: registrationData[0].deanSurname,
      //   username: registrationData[0].username,
      // };

      //ALTERNATIVELY Prepare Dean data to get from the FEATURE FILE
      const deanData = {
        birthDay: birthday,
        birthPlace: birthPlace,
        gender: gender,
        name: name,
        password: password,
        phoneNumber: phoneNumber,
        ssn: ssn,
        surname: surname,
        username: username,
      };

      console.log("last token  " + authToken);

      // Add Dean using API- OLD
      // cy.addDean(authToken, deanData);

      cy.createUserPostRequest(authToken, deanData, loginData[0].deanPostURL);
    });
  }
);

Then(
  "update the dean with user id {string} and verify creation successful for username {string}, ssn {string}, phone number {string}, name {string}, surname {string}, birthday {string}, birth place {string}, gender {string}, password {string}",
  (
    userId,
    username,
    ssn,
    phoneNumber,
    name,
    surname,
    birthday,
    birthPlace,
    gender,
    password
  ) => {
    cy.get("@authToken").then((authToken) => {
      // Prepare Dean data to get from the JSON DATA FILES
      // const deanData = {
      //   birthDay: registrationData[0].dateOfBirth,
      //   birthPlace: registrationData[0].city,
      //   gender: registrationData[0].genderMale,
      //   name: registrationData[0].deanName,
      //   password: registrationData[0].password,
      //   phoneNumber: registrationData[0].phone,
      //   ssn: registrationData[0].ssn,
      //   surname: registrationData[0].deanSurname,
      //   username: registrationData[0].username,
      // };

      //ALTERNATIVELY Prepare Dean data to get from the FEATURE FILE
      const deanData = {
        birthDay: birthday,
        birthPlace: birthPlace,
        gender: gender,
        name: name,
        password: password,
        phoneNumber: phoneNumber,
        ssn: ssn,
        surname: surname,
        username: username,
      };

      console.log("last token  " + authToken);

      // Add Dean using API- OLD
      // cy.addDean(authToken, deanData);

      cy.updateUserPutRequest(
        authToken,
        userId,
        deanData,
        loginData[0].deanPutURL
      );
    });
  }
);
