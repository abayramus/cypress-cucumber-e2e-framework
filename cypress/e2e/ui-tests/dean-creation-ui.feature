Feature: Create Dean Functionality

  Scenario: TC01_dean_creation
    Given user in on the application page
    And user enters username and password, clicks login button
    And user enters dean required fields
    Then vefify the dean creation is successfull