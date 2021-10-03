export interface UserParams {
  email: string;
  password: string;
}

export interface UserUpdateProperties {
  email?: string;
  password?: string;
  permissions?: {
    admin: boolean
  }
}