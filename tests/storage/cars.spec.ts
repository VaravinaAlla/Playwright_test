import { userGaragePageTest as test } from '../../fixtures/userGaragePage';

import { GaragePage } from '../../src/pages/GaragePage';

test.describe('check storage', async () => {
  test('create car', async ({ storagePage }) => {
    const garagePage = new GaragePage(storagePage);
    await garagePage.navigate();
    await garagePage.addCar('Porsche', '911', 56898);
  });
});

test.describe('check storage', async () => {
  test('create car', async ({ storagePage }) => {
    const garagePage = new GaragePage(storagePage);
    await garagePage.navigate();
    await garagePage.addCar('Porsche', '911', 56898);
  });
});
