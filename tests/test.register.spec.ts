import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { GaragePage } from '../src/pages/GaragePage';
import { RegisterWindow } from '../src/pages/RegisterWindow';

test.describe('Registration modal validation', async () => {
  let garagePage: GaragePage;
  let registerWindow: RegisterWindow;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    registerWindow = await homePage.singhUp();
    garagePage = new GaragePage(page);
    
  });

  test('The registration is successful', async () => {
    await registerWindow.signupFistName.fill('Jhon');
    await registerWindow.signupLastName.fill('Martin');
    await registerWindow.signupEmail.fill('aqa-test258@testy.com');
    await registerWindow.signupPassword.fill('zDfgyri^7!@');
    await registerWindow.signupRepeatPassword.fill('zDfgyri^7!@');
    await registerWindow.registerBtn.click();

    await expect(garagePage.title).toHaveText('Garage');
    await expect(garagePage.addCarBtn).toBeVisible();
  });

  test("The registration isn't successful with Name more that 20 characters", async () => {
   
    await registerWindow.signupFistName.fill('somenamethatlongertwenty');
    await registerWindow.signupFistName.blur();
    await expect
      .soft(registerWindow.errorMsg, 'Error "Name has to be from 2 to 20 characters" is shown')
      .toHaveText('Name has to be from 2 to 20 characters long');
  });

  test("The registration isn't successful with LastName is digital", async () => {
   
    await registerWindow.signupLastName.fill('45465689');
    await registerWindow.signupLastName.blur();
    await expect
      .soft(registerWindow.errorMsg, 'Error "Last name is invalid')
      .toHaveText('Last name is invalid');
    await expect
      .soft(registerWindow.signupLastName)
      .toHaveClass(/is-invalid/gm);
    await expect
      .soft(registerWindow.signupLastName, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with empty Email", async () => {
  
    await registerWindow.signupEmail.fill('');
    await registerWindow.signupEmail.blur();
    await expect
      .soft(registerWindow.errorMsg, 'Error "Email required" is shown')
      .toHaveText('Email required');
    await expect.soft(registerWindow.signupEmail).toHaveClass(/is-invalid/gm);
    await expect
      .soft(registerWindow.signupEmail, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with password less 8 characters", async () => {
    await registerWindow.signupPassword.fill('zDfgyr');
    await registerWindow.signupPassword.blur();
    await expect
      .soft(
        registerWindow.errorMsg,
        'Error "Password has to be from 8 to 15 characters" is shown'
      )
      .toHaveText(
        'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
      );
    await expect
      .soft(registerWindow.signupPassword)
      .toHaveClass(/is-invalid/gm);
    await expect
      .soft(registerWindow.signupPassword, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test("The registration isn't successful with password doesn't match", async () => {
    
    await registerWindow.signupFistName.fill('Jhon');
    await registerWindow.signupLastName.fill('Martin');
    await registerWindow.signupEmail.fill('aqa-test789@testy.com');
    await registerWindow.signupPassword.fill('zDfgyri^7!@');
    await registerWindow.signupRepeatPassword.fill('zDfgyri^7');
    await registerWindow.signupRepeatPassword.blur();
    await expect
      .soft(registerWindow.errorMsg, 'Passwords do not match" is shown')
      .toHaveText('Passwords do not match');
    await expect
      .soft(registerWindow.signupRepeatPassword)
      .toHaveClass(/is-invalid/gm);
    await expect
      .soft(registerWindow.signupRepeatPassword, 'Input with red border')
      .toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });
});
