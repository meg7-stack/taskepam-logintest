# SauceDemo Login Tests (Mocha + Cucumber)

Este proyecto automatiza el formulario de login de SauceDemo usando WebDriverIO. Se incluyen dos formas de testear:

- Mocha (test tradicional con JavaScript)
- Cucumber (test con lenguaje Gherkin)

## Casos de prueba

1. UC-1: Campos vacíos → "Username is required"
2. UC-2: Falta contraseña → "Password is required"
3. UC-3: Login válido → título "Swag Labs"

## Cómo correr los tests

Instalá dependencias:

```bash
npm install