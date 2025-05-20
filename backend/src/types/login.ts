export interface LoginPayload {
  username: string;
  name: string;
  id: string;
  isadmin: boolean;
  accessToken: string;
  refreshToken: string;
}

export type RefreshToken = {
  id: string;
  token: string;
  expiry_date: string;
  user_id: string;
};