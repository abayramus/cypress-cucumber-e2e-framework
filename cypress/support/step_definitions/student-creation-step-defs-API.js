const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

let loginData;
let registrationData;

before(() => {
  //tum classdan once tek seferlik yapmak istediklerimiz yazilacak
  cy.fixture("creds").then((data) => {
    loginData = data;
  });

  cy.fixture("register-data").then((data) => {
    registrationData = data;
  });
});

Then(
  "create a new student and verify creation successful for for advisory teacher id {string}, birthday {string}, birth place {string}, email {string}, fathers name {string}, gender {string}, mothers name {string}, name {string}, password {string}, phone number {string}, ssn {string}, surname {string}, username {string}",
  (
    id,
    birthday,
    birthPlace,
    email,
    fathersname,
    gender,
    mothersname,
    name,
    password,
    phoneNumber,
    ssn,
    surname,
    username
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
        advisorTeacherId: id,
        birthDay: birthday,
        birthPlace: birthPlace,
        email: email,
        fatherName: fathersname,
        gender: gender,
        motherName: mothersname,
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

      cy.createUserPostRequest(
        authToken,
        deanData,
        loginData[0].studentPostURL
      );
    });
  }
);

Then(
  "verify the student creation is successful for username {string}, ssn {string}, phone number {string}",
  (expectedUsername, expectedSsn, expectedPhoneNumber) => {
    cy.get("@authToken").then((token) => {
      // console.log(token);

      cy.request({
        method: "GET",
        url: loginData[0].studentGetURL,
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
