Feature: Create Dean Functionality

  Scenario: TC01_dean_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200" for get URL "https://managementonschools.com/app/dean/getAll"
    Then create a new dean and verify creation successful for username "abcte00001", ssn "123-45-5251", phone number "145-111-0001", name "tettt1", surname "tettt1", birthday "2000-01-01", birth place "Istanbul", gender "MALE", password "123456aA"
    Then verify the dean creation is successful for username "abcte00001", ssn "123-45-5251", phone number "145-111-0001"