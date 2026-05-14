import { axiosGet } from '../../hook/useAxios';
import { chromeStorage } from '../../utils/chromeStorage';
import authEndpoints from './auth.endpoints';
import type { ISession, IUser } from './auth.types';

async function getSession(extState: string): Promise<ISession> {
  const response = await axiosGet.get<ISession>(authEndpoints.session(extState));
  return response.data;
}

async function getMe(): Promise<IUser> {
  const response = await axiosGet.get<{ user: IUser }>(authEndpoints.me);
  return response.data.user;
}

async function logout(): Promise<void> {
  await axiosGet.post(authEndpoints.logout);
  await chromeStorage.clear('sessionToken', 'user', 'extState');
}

const authServices = { logout, getSession, getMe };

export default authServices;
