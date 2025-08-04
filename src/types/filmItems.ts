export interface Transform {
  translateX: number;
  translateY: number;
  scale: number;
  rotation: number;
}

export interface BaseFilmItem {
  id: string;
  type: 'image' | 'text' | 'counter';
  transform: Transform;
  zIndex: number;
}

export interface ImageItem extends BaseFilmItem {
  type: 'image';
  uri: string;
}

export interface TextItem extends BaseFilmItem {
  type: 'text';
  content: string;
  fontSize: number;
  color: string;
  fontFamily?: string;
}

export interface CounterItem extends BaseFilmItem {
  type: 'counter';
  title: string;
  targetDate: string; // ISO date string
  fontSize: number;
  color: string;
  fontFamily?: string;
}

export type FilmItem = ImageItem | TextItem | CounterItem;