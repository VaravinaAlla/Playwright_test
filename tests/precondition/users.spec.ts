import test, { expect } from '@playwright/test';
import generateHeaderWithCookies from '../../utils/generateHeaderWithCookies';
import deleteUser from '../../utils/users/deleteUser';
import createUser from '../../utils/users/createUser';
import { users } from '../../test-data/credential';

test.describe('User removing precondition', () => {
  let header;

  test('Create user 1', async ({ request }) => {
    header = await generateHeaderWithCookies(
      users.mainUser.email,
      users.mainUser.password
    );
    const response = await createUser(
      users.mainUser.name,
      users.mainUser.lastName,
      users.mainUser.email,
      users.mainUser.password
    );
  });

  test('Remove user 1', async ({ request }) => {
    header = await generateHeaderWithCookies(
      users.mainUser.email,
      users.mainUser.password
    );
    const response = await deleteUser(header);
  });
});
