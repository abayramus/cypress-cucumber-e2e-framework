class AddDeanPage{
    
    // css locators
    loginLink ="a[href='/login']";
    menuButton = "button[class='fw-semibold text-white bg-primary navbar-toggler collapsed']"
    deanManagementButton = "body > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > a:nth-child(2)"
    usernameBox="#username"
    passwordBox="#password"
    loginButton="button[class='fw-semibold btn btn-primary']"
    name="#name"
    surname="#surname"
    birthPlace="#birthPlace"
    genderFemale="input[value='FEMALE']"
    genderMale="input[value='MALE']"
    birthDay="#birthDay"
    phoneNumber="#phoneNumber"
    ssn="#ssn"
    username="#username"
    deanPassword="#password"
    deanSavedPopUp="body > div:nth-child(2) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
    deanSubmit=".btn-primary"

// NOTE: Page class da sadece elementleri bulup, test class da bu elementleri cagirabiliril. Burdaki orneklerdeki gibi,
// Ama cypress da burda reusable method kullanip cagirmak daha kullanisli.
    // getUsernameBox(){
    //     return cy.get(this.firstNameInput)
    // }
    // addDeanPage.getUsernameBox().type("john")
    // getPasswordBox(){
    //     return cy.get(this.lastNameInput)
    // }
    // addDeanPage.getUsernameBox().type("1234")


    // reusable methods- recommended
    setUsername(username){
        cy.get(this.usernameBox).type(username)
    }
    setPassword(password){
        cy.get(this.passwordBox).type(password)
    }
    clickOnLoginButton(){
        cy.get(this.loginButton).click()
    }
    clickOnMenu(){
        cy.get(this.menuButton).click()
    }
    clickOnDeanManagement(){
        cy.get(this.deanManagementButton).click()
    }
    enterDeanName(name){
        cy.get(this.name).type(name, { force: true })
    }
    enterDeanSurName(surname){
        cy.get(this.surname).type(surname, { force: true })
    }
    enterBirthPlace(birthplace){
        cy.get(this.birthPlace).type(birthplace)
    }
    enterDeanGender(gender){
        if(gender=="female"){
        cy.get(this.genderFemale).click()
        }else{
            cy.get(this.genderMale).click()
        }
    }
    enterBirthDay(birthday){
        cy.get(this.birthDay).type(birthday)
    }
    enterPhone(phone){
        cy.get(this.phoneNumber).type(phone)
    }
    enterSSN(ssn){
        cy.get(this.ssn).type(ssn)
    }
    enterUsername(username){
        cy.get(this.username).type(username)
    }
    enterDeanPassword(pass){
        cy.get(this.deanPassword).type(pass)
    }
    clickOnDeanSubmit(){
        cy.get(this.deanSubmit).click()
    }
    verifyDeanRegistration(){
        cy.get(this.deanSavedPopUp).should('be.visible')
    }


}

export default AddDeanPage;