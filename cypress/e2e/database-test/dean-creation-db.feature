
Feature: Create Dean Functionality

  Scenario: TC01_read_dean_info
    Given user connects to the application database and gets the column "*" from the table "dean"
    # And create a new dean with the following details
    Given create a new dean with the following details
  | field        | value            |
  | deanName     | John Doe         |
  | deanSurname  | Doe              |
  | username     | johndoe          |
  | ssn          | 123-45-6789      |
  | phone        | 123-456-7890     |
  | dateOfBirth  | 1980-01-01       |
  | genderMale   | 1            |
  | password     | securePassword!  |
  | city         | Sample City      |

 Then verify the following exist in the database username "fffaaa1", ssn "544-45-0487", phone number "544-455-4421"