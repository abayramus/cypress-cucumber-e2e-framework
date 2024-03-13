Feature: Create Dean Functionality

  Scenario: TC01_read_dean_info
    Given user connects to the application database and gets the column "*" from the table "dean"
     Then verify the following exist in the database username "abctest13", ssn "045-11-0987", phone number "145-111-5121"
 