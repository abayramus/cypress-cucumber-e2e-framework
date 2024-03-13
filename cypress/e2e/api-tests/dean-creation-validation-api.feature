Feature: Create Dean Functionality

  Scenario: TC01_dean_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200"
    Then verify the dean creation is successful for username "abctest13", ssn "045-11-0987", phone number "145-111-5121"


# ALTERNATIVELY SCENARIO OUTLINE CAN BE USED. STEP DEFS WORT CHANGE:
# Scenario Outline: TC01_dean_creation
#   Given user has a valid authentication token
#   And the API response should indicate status code "200"
#   Then verify the dean creation is successful for username "<username>", ssn "<ssn>", phone number "<phoneNumber>"

#    Examples:
#    | username | ssn          | phoneNumber  |
#   | abctest13 | 045-11-0987  | 145-111-5121  |
