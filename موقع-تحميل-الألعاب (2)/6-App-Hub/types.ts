
export interface Game {
  id: number;
  title: string;
  developer: string;
  category: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  videoUrl: string; 
  downloadUrl: string;
  rating: number;
  screenshots: string[];
  downloadCount: string;
}