
export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum FurnitureCategory {
  LIVING = 'Sala de Estar',
  DINING = 'Sala de Jantar',
  BEDROOM = 'Quarto',
  OFFICE = 'Escritório',
  DECOR = 'Decoração'
}
