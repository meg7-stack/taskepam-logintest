Feature: Login form 

  Scenario: UC-1 Empty credentials
    Given I open the SauceDemo login page
    When I type "hello" in username and "hello" in password
    And I clear both fields
    And I click the login button
    Then I should see the error "Epic sadface: Username is required"

  Scenario: UC-2 Missing password
    Given I open the SauceDemo login page
    When I type "hello" in username and "hello" in password
    And I clear only the password field
    And I click the login button
    Then I should see the error "Epic sadface: Password is required"

  Scenario: UC-3 Valid credentials
    Given I open the SauceDemo login page
    When I type "standard_user" in username and "secret_sauce" in password
    And I click the login button
    Then I should see the page title "Swag Labs"