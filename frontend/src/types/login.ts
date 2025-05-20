export interface LoginCredentials {
  username: string;
  password: string;
}

// Type for API response for successful login
export interface LoginPayload {
  username: string;
  name: string;
  id: string;
  isadmin: boolean;
  accessToken: string;
  refreshToken: string;
}
