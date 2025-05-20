export interface NewUser {
  username: string;
  name: string;
  password: string;
  isadmin: boolean;
}

export type UserFromBackend = Omit<NewUser, 'password'> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
