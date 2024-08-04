import createAPICookies from './api/cookies/createAPIAuthCookies';

export default async function generateHeaderWithCookies(
  email: string,
  password: string
) {
  const sid = await createAPICookies(email, password);
  return { Cookie: `sid =${sid}` };
}
