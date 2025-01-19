
export type UserRole = "USER" | "ADMIN"

export interface UserData {
  username: string;
  id: string;
  email: string;
  role: UserRole
}