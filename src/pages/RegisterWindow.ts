import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterWindow extends BasePage {
  protected readonly _modalWindowRegister: Locator;
  protected readonly _signupFirsName: Locator;
  protected readonly _signupLastName: Locator;
  protected readonly _signupEmail: Locator;
  protected readonly _signupPassword: Locator;
  protected readonly _signupRepeatPassword: Locator;
  protected readonly _registerBtn: Locator;
  protected readonly _errorMsg: Locator;

  constructor(page: Page) {
    super(page, '/');
    this._modalWindowRegister = this._page.locator('.modal-content');
    this._signupFirsName = this._modalWindowRegister.locator('#signupName');
    this._signupLastName = this._modalWindowRegister.locator('#signupLastName');
    this._signupEmail = this._modalWindowRegister.locator('#signupEmail');
    this._signupPassword = this._modalWindowRegister.locator('#signupPassword');
    this._signupRepeatPassword = this._modalWindowRegister.locator(
      '#signupRepeatPassword'
    );
    this._registerBtn = this._modalWindowRegister.getByRole('button', {
      name: 'Register',
    });
    this._errorMsg = this._modalWindowRegister.locator('.invalid-feedback');
  }

  get signupFistName() {
    return this._signupFirsName;
  }

  get signupLastName() {
    return this._signupLastName;
  }

  get signupEmail() {
    return this._signupEmail;
  }
  
  get signupPassword() {
    return this._signupPassword;
  }

  get signupRepeatPassword() {
    return this._signupRepeatPassword;
  }

  get registerBtn() {
    return this._registerBtn;
  }

  get errorMsg() {
    return this._errorMsg;
  }
}
