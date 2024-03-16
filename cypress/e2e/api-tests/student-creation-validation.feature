Feature: Create Student Functionality

  Scenario: TC01_student_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200" for get URL "https://managementonschools.com/app/students/getAll"
    Then verify the student creation is successful for username "benstudent45", ssn "123-53-1904", phone number "145-111-7804"
