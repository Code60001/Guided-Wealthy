export type UserRole = 'admin' | 'user' | 'advisor' | 'partner';

export interface PersonalInfo {
  address?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
}

export interface User {
  _id: string;
  id: string;
  name?: string;
  email?: string;
  countryCode?: string;
  phone: string;
  role: UserRole;
  isDeleted: boolean;
  isBanned: boolean;
  personalInfo?: PersonalInfo;
  createdAt: string;
  updatedAt?: string;
  avatar?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  advisorsCount: number;
  partnersCount: number;
  bannedUsers: number;
}
