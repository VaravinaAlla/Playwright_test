import test, { expect } from '@playwright/test';
import { users } from '../../test-data/credential';

test.describe('API TESTS with auth in BeforeAll', () => {
  let sid: string;

  test.beforeAll(async ({ request }) => {
    const authRequest = await request.post('/api/auth/signin', {
      data: {
        email: users.mainUser.email,
        password: users.mainUser.password,
        remember: true,
      },
    });
    const cookies = authRequest.headers()['set-cookie'];
    console.log(authRequest.headers());
    if (cookies) {
      const cookieArray = cookies.split('\n');
      for (const cookie of cookieArray) {
        if (cookie.trim().startsWith('sid=')) {
          sid = cookie.trim().split('=')[1].split(';')[0];
          break;
        }
      }
    }
  });

  test('/create cars positive', async ({ request }) => {
    const response = await request.post('/api/cars/', {
      headers: {
        Cookie: `sid=${sid}`,
      },
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
      },
    });
    const body = await response.json();
    test.expect(body.status).toBe('ok');
    test.expect(body.data.brand).toBe('Audi');
    test.expect(body.data.model).toBe('TT');
    test.expect(body.data.mileage).toBe(122);
  });

  test('/create cars negative with carBrabdId is String', async ({
    request,
  }) => {
    const response = await request.post('/api/cars/', {
      headers: {
        Cookie: `sid=${sid}`,
      },
      data: {
        carBrandId: 'Audi',
        carModelId: 1,
        mileage: 122,
      },
    });
    const body = await response.json();
    test.expect(body.status).toBe('error');
    test.expect(body.message).toBe('Invalid car brand type');
  });

  test('/create cars negative with carModelId is invalid', async ({
    request,
  }) => {
    const response = await request.post('/api/cars/', {
      headers: {
        Cookie: `sid=${sid}`,
      },
      data: {
        carBrandId: 2,
        carModelId: 35,
        mileage: 122,
      },
    });
    const body = await response.json();
    test.expect(body.status).toBe('error');
    test.expect(body.message).toBe('Model not found');
  });
});
