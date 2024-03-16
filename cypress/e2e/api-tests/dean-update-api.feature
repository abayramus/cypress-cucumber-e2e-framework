Feature: Create Dean Functionality

  Scenario: TC01_dean_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200" for get URL "https://managementonschools.com/app/dean/getAll"
    Then update the dean with user id "4173" and verify creation successful for username "ab421", ssn "123-45-5001", phone number "145-000-0001", name "tet000", surname "te0000", birthday "2000-01-01", birth place "Ankara", gender "MALE", password "123456aA"
    Then verify the dean creation is successful for username "ab421", ssn "123-45-5001", phone number "145-000-0001"

