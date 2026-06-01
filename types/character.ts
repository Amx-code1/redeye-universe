export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;

  avatar_url?: string;
  rank?: string;
  status?: string;
  faction?: string;
  age?: number;
  power_level?: number;
  quote?: string;
  abilities?: string;

  danger_level?: string;
}