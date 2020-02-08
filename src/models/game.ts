export type Game = {
  id: string;
  name: string;
  year_published: number;
  min_players: number;
  max_players: number;
  min_playtime: number; // 분 단위
  max_playtime: number;
  min_age: number;
  description: string; // raw HTML
  description_preview: string;
  image_url: string; // url
  thumb_url: string;
};
