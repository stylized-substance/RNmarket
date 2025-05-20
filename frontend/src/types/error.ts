import { AxiosError } from 'axios';

// Type for API error response for use in service modules
export interface ApiErrorResponse extends AxiosError {
  Error: string;
}
