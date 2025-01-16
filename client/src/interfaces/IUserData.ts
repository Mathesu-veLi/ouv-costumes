import { UserRole } from "@/enums/UserRole";

export interface IUserData {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}
