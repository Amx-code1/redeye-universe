export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  faction: string;
  danger_level: string;

  avatar_url?: string;
  rank?: string;
  status?: string;
  age?: number;
  abilities?: string;
  quote?: string;
  power_level?: string;
}