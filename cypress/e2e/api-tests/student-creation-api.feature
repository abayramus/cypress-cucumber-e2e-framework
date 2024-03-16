Feature: Create Student Functionality

  Scenario: TC01_student_creation
    Given user has a valid authentication token
    And the API response should indicate status code "200" for get URL "https://managementonschools.com/app/students/getAll"
    Then create a new student and verify creation successful for for advisory teacher id "4941", birthday "2000-01-01", birth place "Istanbul", email "students414@gmail.com", fathers name "johny john", gender "MALE", mothers name "suzan suzi", name "tett1", password "123456aA", phone number "145-111-7804", ssn "123-53-1904", surname "tett45", username "benstudent45"
