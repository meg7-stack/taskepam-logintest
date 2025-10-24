const LoginPage = require('../po/pageobjects/login.page');

describe('Epam SauceDemo Login Tests', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
    });

    it('UC-1: Empty credentials', async () => {
        await LoginPage.usernameInput.setValue('hello');
        await LoginPage.passwordInput.setValue('hello');
        await LoginPage.usernameInput.clearValue();
        await LoginPage.passwordInput.clearValue();
        await LoginPage.loginButton.click();

        const errorText = await LoginPage.errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Username is required');
    });

    it('UC-2: Missing password', async () => {
        await LoginPage.usernameInput.setValue('hello');
        await LoginPage.passwordInput.setValue('hello');
        await LoginPage.passwordInput.clearValue();
        await LoginPage.loginButton.click();

        const errorText = await LoginPage.errorMessage.getText();
        expect(errorText).toContain('Epic sadface: Password is required');
    });

    it('UC-3: Valid credentials', async () => {
        await LoginPage.usernameInput.setValue('standard_user');
        await LoginPage.passwordInput.setValue('secret_sauce');
        await LoginPage.loginButton.click();

        const pageTitle = await browser.getTitle();
        expect(pageTitle).toBe('Swag Labs');

    });
});