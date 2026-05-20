export interface IUser {
  sub: string;
  first_name: string;
  email: string;
}

export interface ISession {
  sessionToken: string;
  user: IUser;
}
