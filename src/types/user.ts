
export type UserRole = "USER" | "ADMIN"

export interface UserIdentity {
  username: string;
}

export interface UserData {
  username: string;
  nickname: string;
  email: string;
  role?: UserRole;
  id?: string;
}