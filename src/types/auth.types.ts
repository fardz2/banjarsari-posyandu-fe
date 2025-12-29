/**
 * Auth Session Interface
 */
export interface AuthSession {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    role?: string;
  };
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
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    role?: string;
  };
  session: {
    id: string;
    expiresAt: string;
  };
}
