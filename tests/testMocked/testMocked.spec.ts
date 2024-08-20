import { userGaragePageTest as test } from '../../fixtures/userGaragePage';
import { HomePage } from '../../src/pages/HomePage';
import { GaragePage } from '../../src/pages/GaragePage';
import { users } from '../../test-data/credential';

test.describe('check storage', () => {
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    garagePage = await homePage.loginAsUser(
      users.mainUser.email,
      users.mainUser.password
    );
    garagePage.myProfile.click();
  });

  test('Verify profile name', async ({ page }) => {
    const testData = {
      status: 'ok',
      data: [
        {
          userId: 128903,
          photoFilename: 'user-1720733945832.png',
          name: 'NewName',
          lastName: 'Testovich',
        },
      ],
    };

    await page.route('**/api/users/profile', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify(testData),
      })
    );

    await page.waitForSelector('.page_content');
    const profileName = await page.locator('.page_content').textContent();
    test.expect(profileName).toBe('NewName Testovich');
  });
});
