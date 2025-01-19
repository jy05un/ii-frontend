import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export default function retrieveAccessToken(response: AxiosResponse) {
  const accessToken = response.headers['authorization']
    ?.toString()
    .replace('Bearer: ', '')
    .trim();
  if (!accessToken) {
    throw Error('Access token not provided');
  }
  Cookies.set('accessToken', accessToken, { expires: 4 });
}
