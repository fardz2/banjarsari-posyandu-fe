/**
 * User Interface
 */
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Auth Session Interface
 */
export interface AuthSession {
  user: User;
  session: {
    id: string;
    expiresAt: string;
    token?: string;
  };
}

/**
 * Login Response from Better-auth
 */
export interface LoginResponse {
  user: User;
  session: {
    id: string;
    expiresAt: string;
  };
}
