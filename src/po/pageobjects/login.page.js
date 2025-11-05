const { $ } = require('@wdio/globals')

class LoginPage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#login-button'); }
    get errorMessage() { return $('h3[data-test="error"]'); }
}

module.exports = new LoginPage();
