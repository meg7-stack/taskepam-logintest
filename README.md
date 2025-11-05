SauceDemo Login Tests (Mocha + Cucumber)

This project automates the SauceDemo login form using WebDriverIO. It includes two ways to test:

- Mocha (traditional test with JavaScript)
- Cucumber (test written in Gherkin language)

Test cases:
UC-1: Empty credentials → Result: "Username is required"
UC-2: Missing password → Result: "Password is required"
UC-3: Valid credentials → Result: title "Swag Labs"

Browsers:
1- Chrome
2- Firefox
3- Edge

Note:
WebDriverIO is configured to test first with Cucumber.
To run with Mocha, change the configuration in wdio.conf.js in the specs section, framework, etc.