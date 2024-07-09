import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './BaseComponents';

export class SignInModal extends BaseComponent {
  protected readonly _emailInput: Locator;
  protected readonly _passwordInput: Locator;
  protected readonly _logInBtn: Locator;

  constructor(page: Page) {
    super(page, page.locator('app-signin-modal'));
    this._emailInput = this._container.locator('#signinEmail');
    this._passwordInput = this._container.locator('#signinPassword');
    this._logInBtn = this._container.getByRole('button', { name: 'Login' });
  }
  async login(login: string, pass: string) {
    await this._emailInput.fill(login);
    await this._passwordInput.fill(pass);
    await this._logInBtn.click();
  }
}
