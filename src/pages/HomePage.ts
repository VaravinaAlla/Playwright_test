import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { GaragePage } from './GaragePage';
import { RegisterWindow } from './RegisterWindow';
import { SignInModal } from '../components/SignInModal';

export class HomePage extends BasePage {
  protected readonly _header: Locator;
  protected readonly _sighInPopUp: SignInModal;
  protected readonly _signInBtn: Locator;
  protected readonly _guestLoginBtn: Locator;
  protected readonly _modalWindow: Locator;
  protected readonly _registrationBtn: Locator;

  constructor(page: Page) {
    super(page, '/');
    this._header = this._page.locator('.header');
    this._guestLoginBtn = this._header.getByRole('button', {
      name: 'Guest log in',
    });
    this._signInBtn = this._header.getByRole('button', { name: 'Sign in' });
    this._modalWindow = this._page.locator('app-signin-modal');
    this._registrationBtn = this._modalWindow.getByRole('button', {
      name: 'registration',
    });
    this._sighInPopUp = new SignInModal(this._page);
  }

  async loginAsGuest() {
    await this._guestLoginBtn.click();
    return new GaragePage(this._page);
  }

  async singhUp() {
    await this._signInBtn.click();
    await this._registrationBtn.click();
    return new RegisterWindow(this._page);
  }

  async loginAsUser(login: string, pass: string) {
    await this._signInBtn.click();
    await this._sighInPopUp.login(login, pass);
  }

  get header() {
    return this._header;
  }

  get signInBtn() {
    return this._signInBtn;
  }

  get modalWindow() {
    return this._modalWindow;
  }

  get registrationBtn() {
    return this._registrationBtn;
  }
}
