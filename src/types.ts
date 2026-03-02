export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'Premium' | 'Classic' | 'Anodizing' | 'Special';
  image: string;
}

export interface Advantage {
  id: number;
  title: string;
  description: string;
  image: string;
}
