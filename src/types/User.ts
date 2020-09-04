export type User = {
  id: number;
  profileImageUrl: string;
  providerId: string;
  age?: number;
  height?: number;
  weight?: number;
  phoneNum?: string;
  channelTitleImageUrl?: string;
  channelDescription?: string;
  channelSnsUrl?: string;
  followersCount: number;
  totalViewCount: number;
  email: string;
  name: string;
  isActive: true;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  isLoggedIn: boolean;
};