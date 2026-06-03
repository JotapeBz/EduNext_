/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: number;
  number: number;
  title: string;
  titleEn: string;
  status: 'completed' | 'active' | 'locked';
}

export interface Challenge {
  id: string;
  title: string;
  titleEn: string;
  iconName: string;
  progress: number;
  target: number;
  rewardDiamonds: number;
  completed: boolean;
}

export interface RewardItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  cost: number;
  icon: string;
  badge?: string;
  badgeEn?: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  memberSince: string;
  memberSinceEn: string;
  streak: number;
  crowns: number;
  diamonds: number;
  xpProgress: number; // 45 means 45% completed
}

export type Language = 'es' | 'en';

export interface AppState {
  isLoggedIn: boolean;
  user: UserProfile;
  lessons: Lesson[];
  challenges: Challenge[];
  purchasedRewards: string[]; // List of reward IDs purchased
  lang: Language;
}
