const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
import AddDeanPage from "../pages/AddDeanPage";
let loginData;
let registrationData;
let user;
const deanPage = new AddDeanPage();

before(() => {
  //tum classdan once tek seferlik yapmak istediklerimiz yazilacak
  cy.fixture("creds").then((data) => {
    loginData = data;
  });

  cy.fixture("register-data").then((data) => {
    registrationData = data;
  });
});

Given("user in on the application page", () => {
  cy.visit(loginData[0].url);
});

When("user enters username and password, clicks login button", () => {
  cy.login(loginData[0].username, loginData[0].password);
});

When("user enters dean required fields", () => {
  deanPage.clickOnMenu();
  deanPage.clickOnDeanManagement();
  // deanPage.enterDeanName('john10');//hard coded not recommended
  deanPage.enterDeanName(registrationData[0].deanName);
  deanPage.enterDeanSurName(registrationData[0].deanSurname);
  deanPage.enterBirthPlace(registrationData[0].city);
  deanPage.enterDeanGender(registrationData[0].genderMale);
  deanPage.enterBirthDay(registrationData[0].dateOfBirth);
  deanPage.enterPhone(registrationData[0].phone);
  deanPage.enterSSN(registrationData[0].ssn);
  deanPage.enterUsername(registrationData[0].username);
  deanPage.enterDeanPassword(registrationData[0].password);
  deanPage.clickOnDeanSubmit();
});

Then("vefify the dean creation is successfull", () => {
  deanPage.verifyDeanRegistration();
});

When("user enters dean required fields with faker", () => {
  deanPage.clickOnMenu();
  deanPage.clickOnDeanManagement();

  cy.generateUsers().then((user) => {
    console.log("USER -- ", user); // Log the generated user object

    deanPage.enterDeanName(user.name);
    deanPage.enterDeanSurName(user.username);
    deanPage.enterBirthPlace(user.city);
    deanPage.enterDeanGender(user.gender);
    deanPage.enterBirthDay(user.dateOfBirth);
    deanPage.enterPhone(user.phone);
    deanPage.enterSSN(user.ssn);
    deanPage.enterUsername(user.username);
    deanPage.enterDeanPassword(user.password);
  });

  deanPage.clickOnDeanSubmit();
});
