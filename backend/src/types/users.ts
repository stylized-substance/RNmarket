export interface User {
  id: string;
  username: string;
  name: string;
  passwordhash: string | null;
  isadmin: boolean;
}

export type UserWithoutHash = Omit<User, 'passwordhash'>;

export interface NewUser {
  username: string;
  name: string;
  password: string;
  isadmin: boolean;
}
