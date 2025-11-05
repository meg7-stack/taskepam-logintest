const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../po/pageobjects/login.page');

Given('I open the SauceDemo login page', async () => {
    await browser.url('https://www.saucedemo.com/');
});

When('I type {string} in username and {string} in password', async (username, password) => {
    await LoginPage.usernameInput.setValue(username);
    await LoginPage.passwordInput.setValue(password);
});

//
// Reusable method to clear React-controlled inputs
//
async function clearInputReact(selector) {
    return await browser.execute((sel) => {
        const el = document.querySelector(sel);
        if (!el) return { ok: false, msg: 'Selector not found' };

        const desc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        desc?.set ? desc.set.call(el, '') : (el.value = '');

        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.blur();

        return { ok: true };
    }, selector);
}

When('I clear both fields', async () => {
    await Promise.all([
        clearInputReact('#user-name'),
        clearInputReact('#password'),
    ]);

    await browser.waitUntil(async () => {
        const u = await LoginPage.usernameInput.getValue();
        const p = await LoginPage.passwordInput.getValue();
        return u === '' && p === '';
    }, { timeout: 3000, timeoutMsg: 'Fields not cleared correctly' });
});

When('I clear only the password field', async () => {
    await clearInputReact('#password');

    await browser.waitUntil(async () => {
        const p = await LoginPage.passwordInput.getValue();
        return p === '';
    }, { timeout: 3000, timeoutMsg: 'Password not cleared correctly' });
});

When('I click the login button', async () => {
    await LoginPage.loginButton.click();
});

Then('I should see the error {string}', async (expectedMessage) => {
    await expect(LoginPage.errorMessage).toBeDisplayed();
    const errorText = await LoginPage.errorMessage.getText();
    await expect(errorText).toContain(expectedMessage);
});

Then('I should see the page title {string}', async (expectedTitle) => {
    await browser.waitUntil(
        async () => (await browser.getTitle()) === expectedTitle,
        { timeout: 5000, timeoutMsg: 'Title did not load correctly' }
    );
    await expect(await browser.getTitle()).toBe(expectedTitle);
});


