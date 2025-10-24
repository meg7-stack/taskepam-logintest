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
// Método para limpiar inputs controlados por React
//
async function clearInputReact(selector) {
    // Ejecuta script en contexto del navegador y retorna resultado
    const result = await browser.execute(function (sel) {
        const el = document.querySelector(sel);
        if (!el) return { ok: false, msg: 'selector not found: ' + sel };

        // Usar setter nativo para asegurar que React detecte el cambio
        const desc = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        if (desc && desc.set) {
            desc.set.call(el, '');
        } else {
            el.value = '';
        }

        // Disparar eventos que React suele escuchar
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.blur();

        return { ok: true, val: el.value };
    }, selector);

    return result;
}

When('I clear both fields', async () => {
    // Limpiar ambos
    const r1 = await clearInputReact('#user-name');
    const r2 = await clearInputReact('#password');

    // Logs para debug (se ven en consola)
    console.log('clear username result:', r1);
    console.log('clear password result:', r2);

    // Verificar que ambos estén vacíos (getValue lee lo que el navegador expone)
    await browser.waitUntil(async () => {
        const u = await LoginPage.usernameInput.getValue();
        const p = await LoginPage.passwordInput.getValue();
        return u === '' && p === '';
    }, { timeout: 3000, timeoutMsg: 'Los campos no se limpiaron correctamente' });
});

When('I clear only the password field', async () => {
    const r = await clearInputReact('#password');
    console.log('clear only password result:', r);

    await browser.waitUntil(async () => {
        const p = await LoginPage.passwordInput.getValue();
        return p === '';
    }, { timeout: 3000, timeoutMsg: 'El campo password no se limpió correctamente' });
});

When('I click the login button', async () => {
    await LoginPage.loginButton.click();
});

Then('I should see the error {string}', async (expectedMessage) => {
    await expect(LoginPage.errorMessage).toBeDisplayed();
    const errorText = await LoginPage.errorMessage.getText();
    console.log('Mensaje recibido:', errorText);
    await expect(errorText).toContain(expectedMessage);
});

Then('I should see the page title {string}', async (expectedTitle) => {
    await browser.waitUntil(async () => {
        const title = await browser.getTitle();
        return title === expectedTitle;
    }, { timeout: 5000, timeoutMsg: 'El título no coincide o no cargó a tiempo' });

    const pageTitle = await browser.getTitle();
    await expect(pageTitle).toBe(expectedTitle);
});

