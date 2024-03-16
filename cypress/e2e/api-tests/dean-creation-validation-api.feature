Feature: Create Dean Functionality

  Scenario: TC01_dean_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200" for get URL "https://managementonschools.com/app/dean/getAll"
    Then verify the dean creation is successful for username "ab421", ssn "123-45-5001", phone number "145-000-0001"
  
  
  # ALTERNATIVELY SCENARIO OUTLINE CAN BE USED. STEP DEFS WORT CHANGE:
  Scenario Outline: TC01_dean_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200" for get URL "https://managementonschools.com/app/dean/getAll"
    Then verify the dean creation is successful for username "<username>", ssn "<ssn>", phone number "<phoneNumber>"

    Examples:
      | username  | ssn         | phoneNumber  |
      | ab421 | 123-45-5001 | 145-000-0001 |
      | john10   | 145-11-0090 | 145-111-1401 |
      | jhn15   | 143-11-1467 | 145-111-6784 |
