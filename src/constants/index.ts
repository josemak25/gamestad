import { theme } from '../theme/types';

declare global {
  interface Console {
    tron: any;
  }
}

// App header custom style
export const customHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  backgroundColor: theme.colors.BD_DARK_COLOR
};

export interface GameReleaseDateInterface {
  id: number;
  category: number;
  created_at: Date;
  date: Date;
  game: number;
  human: string;
  m: number;
  platform: number;
  region: number;
  updated_at: Date;
  y: Date;
}

export interface GameGenreInterface {
  id: number;
  name: string;
  slug: string;
  url: string;
  created_at: Date;
  updated_at: Date;
}

export interface GameScreenshotInterface {
  id: number;
  image_id: string;
  game: number;
  height: number;
  width: number;
  url: string;
}

export interface GameVideoInterface {
  id: number;
  name: string;
  game: number;
  video_id: string;
}