# SauceDemo Login Tests (Mocha + Cucumber)

Este proyecto automatiza el formulario de login de SauceDemo usando WebDriverIO. Se incluyen dos formas de testear:

- Mocha (test tradicional con JavaScript)
- Cucumber (test con lenguaje Gherkin)

## Casos de prueba

1. UC-1: Campos vacíos → Resultado: "Username is required"
2. UC-2: Falta contraseña → Resultado: "Password is required"
3. UC-3: Login válido → Resultado: título "Swag Labs"

## Browsers
1- Chrome
2- Firefox
3- Edge

### Aclaración

WebDriverIO está configurado para testear primero con Cucumber.
Para hacerlo en Mocha, cambiar la configuración en wdio.conf.js en la sección de specs.