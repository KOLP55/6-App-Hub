
export interface App {
  id: string;
  name: string;
  category: 'ألعاب' | 'تطبيقات' | 'إنتاجية' | 'تواصل اجتماعي';
  rating: number;
  reviews: string;
  size: string;
  downloads: string;
  developer: string;
  icon: string;
  images: string[];
  description: string;
  apkUrl: string;
  isEditorChoice: boolean;
}

export interface User {
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
