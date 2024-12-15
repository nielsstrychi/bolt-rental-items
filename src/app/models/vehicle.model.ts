export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: string;
  price: number;
  transmission: 'Manual' | 'Automatic';
  fuel: 'Diesel' | 'Petrol' | 'Electric';
  features: string[];
  images: string[];
  rating: number;
  reviews: number;
  location: string;
}
