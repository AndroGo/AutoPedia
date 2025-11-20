export type Language = 'en' | 'az' | 'tr';

export interface Brand {
  id: string;
  name: string;
  logoUrl: string; // Using text placeholders or external URLs
  country: string;
  category: 'German' | 'Japanese' | 'American' | 'Electric' | 'Luxury' | 'Italian' | 'Other';
}

export interface CarModel {
  name: string;
  productionYears: string;
  engineType: string;
  horsepower: number;
  torque: string;
  acceleration0to100: string; // e.g. "3.4s"
  topSpeed: string;
  weight?: string;
  imageUrl?: string;
}

export interface BrandDetailsData {
  name: string;
  founded: string;
  headquarters: string;
  history: string;
  topModels: CarModel[];
}

export interface ComparisonResult {
  model1: CarModel;
  model2: CarModel;
  winner: {
    horsepower: 'model1' | 'model2' | 'tie';
    acceleration: 'model1' | 'model2' | 'tie';
    topSpeed: 'model1' | 'model2' | 'tie';
  };
  summary: string;
}

export interface SearchResult {
  brand: string;
  model: string;
  description: string;
}