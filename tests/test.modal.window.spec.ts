import { test, expect } from '@playwright/test';

test.describe('Registration modal validation', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const header = page.locator('.header');
    const signInBtn = header.getByRole('button', { name: 'Sign in' });

    const modal = page.locator('.modal-content');
    const registerBtn = modal.getByRole('button', { name: 'registration' });

    await signInBtn.click();
    await registerBtn.click();
  });

  test('The registration is successful', async ({ page }) => {
    const modal = page.locator('.modal-content');
    const profile = page.locator('.app-content');
    const firstNameInput = modal.locator('#signupName');
    const lastNameInput = modal.locator('#signupLastName');
    const emailInput = modal.locator('#signupEmail');
    const passwordInput = modal.locator('#signupPassword');
    const passwordRepeatInput = modal.locator('#signupRepeatPassword');
    const registerBtn = modal.getByRole('button', { name: 'Register' });
    const title = profile.locator('h1')
    await firstNameInput.fill('Jhon');
    await lastNameInput.fill('Martin');
    await emailInput.fill('aqa-test10@testy.com');
    await passwordInput.fill('zDfgyri^7!@');
    await passwordRepeatInput.fill('zDfgyri^7!@');
    await registerBtn.click();
    await expect(title).toHaveText('Garage');

    const addBtn = profile.getByRole('button', { name: 'Add car' });
    await expect(addBtn).toBeVisible();
  });

  test("The registration isn't successful with Name more that 20 characters", async ({
    page,
  }) => {
    const modal = page.locator('.modal-content');
    const firstNameInput = modal.locator('#signupName');
    const errorMsg = modal.locator('.invalid-feedback');
    await firstNameInput.fill('somenamethatlongertwenty');
    await firstNameInput.blur();
    await expect
      .soft(errorMsg, 'Error "Name has to be from 2 to 20 characters" is shown')
      .toHaveText('Name has to be from 2 to 20 characters long');
    await expect.soft(firstNameInput).toHaveClass(/is-invalid/gm);
    await expect
      .soft(firstNameInput, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with LastName is digital", async ({
    page,
  }) => {
    const modal = page.locator('.modal-content');
    const lastNameInput = modal.locator('#signupLastName');
    const errorMsg = modal.locator('.invalid-feedback');
    await lastNameInput.fill('45465689');
    await lastNameInput.blur();
    await expect
      .soft(errorMsg, 'Error "Last name is invalid')
      .toHaveText('Last name is invalid');
    await expect.soft(lastNameInput).toHaveClass(/is-invalid/gm);
    await expect
      .soft(lastNameInput, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with empty Email", async ({
    page,
  }) => {
    const modal = page.locator('.modal-content');
    const emailInput = modal.locator('#signupEmail');
    const errorMsg = modal.locator('.invalid-feedback');
    await emailInput.fill('');
    await emailInput.blur();
    await expect
      .soft(errorMsg, 'Error "Email required" is shown')
      .toHaveText('Email required');
    await expect.soft(emailInput).toHaveClass(/is-invalid/gm);
    await expect
      .soft(emailInput, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with password less 8 characters", async ({
    page,
  }) => {
    const modal = page.locator('.modal-content');
    const passwordInput = modal.locator('#signupPassword');
    const errorMsg = modal.locator('.invalid-feedback');
    await passwordInput.fill('zDfgyr');
    await passwordInput.blur();
    await expect
      .soft(
        errorMsg,
        'Error "Password has to be from 8 to 15 characters" is shown'
      )
      .toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    await expect.soft(passwordInput).toHaveClass(/is-invalid/gm);
    await expect
      .soft(passwordInput, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with password doesn't match", async ({
    page,
  }) => {
    const modal = page.locator('.modal-content');
    const firstNameInput = modal.locator('#signupName');
    const lastNameInput = modal.locator('#signupLastName');
    const emailInput = modal.locator('#signupEmail');
    const passwordInput = modal.locator('#signupPassword');
    const passwordRepeatInput = modal.locator('#signupRepeatPassword');
    const errorMsg = modal.locator('.invalid-feedback');
    await firstNameInput.fill('Jhon');
    await lastNameInput.fill('Martin');
    await emailInput.fill('aqa-test789@testy.com');
    await passwordInput.fill('zDfgyri^7!@');
    await passwordRepeatInput.fill('zDfgyri^7');
    await passwordRepeatInput.blur();
    await expect
      .soft(errorMsg, 'Passwords do not match" is shown')
      .toHaveText('Passwords do not match');
    await expect.soft(passwordRepeatInput).toHaveClass(/is-invalid/gm);
    await expect
      .soft(passwordRepeatInput, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});
