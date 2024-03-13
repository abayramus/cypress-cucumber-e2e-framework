Feature: Create Dean Functionality

  Scenario: TC01_dean_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200"
    Then verify the dean creation is successful for username "abcte0000", ssn "123-45-5259", phone number "145-111-0000", name "tettt9", surname "tettt9", birthday "2000-01-03", birth place "Istanbul", gender "MALE", password "123456aA"
