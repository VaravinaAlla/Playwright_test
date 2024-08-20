import { test as setup } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { users } from '../../test-data/credential';

setup('Login', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.loginAsUser(users.mainUser.email, users.mainUser.password);
    await page.getByRole('button', {name: 'Add car'}).waitFor();
    await page.context().storageState({path: 'session-storage.json'})
});
