import { Page, test } from '@playwright/test';


const USER = process.env.APP_USER_EMAIL!;
const PASS = process.env.APP_USER_PASS!;

export const userGaragePageTest = test.extend<{storagePage: Page}>({
  storagePage: async ({browser}, use) => {
    const pageFromStorage = await browser.newPage({storageState: 'session-storage.json'});
   await use(pageFromStorage)
  },
});
