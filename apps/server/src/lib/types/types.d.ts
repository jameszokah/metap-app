import { userRoles } from "../access/roles";

export type UserRole = typeof userRoles;

export type UserRoleType = UserRole[keyof UserRole]
