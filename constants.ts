import { Language, Brand } from './types';

export const TRANSLATIONS = {
  en: {
    nav: { home: "Home", compare: "Compare", search: "Search" },
    home: { 
      title: "Explore the World of Cars",
      subtitle: "The ultimate encyclopedia for car enthusiasts.",
      categories: { all: "All", german: "German", japanese: "Japanese", american: "American", electric: "Electric", luxury: "Luxury" }
    },
    brand: {
      founded: "Founded",
      hq: "Headquarters",
      history: "History",
      topModels: "Legendary Models",
      specs: { hp: "HP", torque: "Torque", acc: "0-100 km/h", year: "Years", engine: "Engine", speed: "Top Speed" }
    },
    compare: {
      title: "Model Comparison Tool",
      placeholder1: "Enter first model (e.g. BMW M5 F90)",
      placeholder2: "Enter second model (e.g. Audi RS6 C8)",
      button: "Compare Models",
      loading: "Analyzing Performance...",
      vs: "VS",
      winner: "Winner",
      score: "Performance Score"
    },
    search: {
      title: "Smart Search",
      placeholder: "Search by brand, model, or specs (e.g., 'V8 sedans under 4s')...",
      button: "Search",
      results: "Results"
    }
  },
  az: {
    nav: { home: "Ana Səhifə", compare: "Müqayisə", search: "Axtarış" },
    home: { 
      title: "Avtomobil Dünyasını Kəşf Edin",
      subtitle: "Avtomobil həvəskarları üçün ən böyük ensiklopediya.",
      categories: { all: "Hamısı", german: "Alman", japanese: "Yapon", american: "Amerika", electric: "Elektrik", luxury: "Lüks" }
    },
    brand: {
      founded: "Təsis edilib",
      hq: "Mərkəzi Qərargah",
      history: "Tarixçə",
      topModels: "Əfsanəvi Modellər",
      specs: { hp: "At Gücü", torque: "Fırlanma Anı", acc: "0-100 km/s", year: "İllər", engine: "Mühərrik", speed: "Maks. Sürət" }
    },
    compare: {
      title: "Model Müqayisə Aləti",
      placeholder1: "Birinci modeli daxil edin (məs: BMW M5 F90)",
      placeholder2: "İkinci modeli daxil edin (məs: Audi RS6 C8)",
      button: "Müqayisə Et",
      loading: "Performans Təhlil Edilir...",
      vs: "QARŞI",
      winner: "Qalib",
      score: "Performans Xalı"
    },
    search: {
      title: "Ağıllı Axtarış",
      placeholder: "Marka, model və ya göstəricilər üzrə axtarış...",
      button: "Axtar",
      results: "Nəticələr"
    }
  },
  tr: {
    nav: { home: "Ana Sayfa", compare: "Karşılaştır", search: "Ara" },
    home: { 
      title: "Otomobil Dünyasını Keşfedin",
      subtitle: "Otomobil tutkunları için nihai ansiklopedi.",
      categories: { all: "Hepsi", german: "Alman", japanese: "Japon", american: "Amerikan", electric: "Elektrikli", luxury: "Lüks" }
    },
    brand: {
      founded: "Kuruluş",
      hq: "Merkez",
      history: "Tarihçe",
      topModels: "Efsanevi Modeller",
      specs: { hp: "Beygir", torque: "Tork", acc: "0-100 km/s", year: "Yıllar", engine: "Motor", speed: "Maks. Hız" }
    },
    compare: {
      title: "Model Karşılaştırma Aracı",
      placeholder1: "İlk modeli girin (örn: BMW M5 F90)",
      placeholder2: "İkinci modeli girin (örn: Audi RS6 C8)",
      button: "Karşılaştır",
      loading: "Performans Analiz Ediliyor...",
      vs: "VS",
      winner: "Kazanan",
      score: "Performans Puanı"
    },
    search: {
      title: "Akıllı Arama",
      placeholder: "Marka, model veya özelliklere göre arayın...",
      button: "Ara",
      results: "Sonuçlar"
    }
  }
};

// Helper to get text safely
export const getText = (lang: Language, path: string) => {
  const keys = path.split('.');
  let current: any = TRANSLATIONS[lang];
  for (const key of keys) {
    if (current[key] === undefined) return path;
    current = current[key];
  }
  return current as string;
};

export const POPULAR_BRANDS: Brand[] = [
  { id: 'bmw', name: 'BMW', country: 'Germany', category: 'German', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
  { id: 'mercedes', name: 'Mercedes-Benz', country: 'Germany', category: 'German', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { id: 'audi', name: 'Audi', country: 'Germany', category: 'German', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi-Logo_2016.svg' },
  { id: 'porsche', name: 'Porsche', country: 'Germany', category: 'Luxury', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Porsche_Wappen.svg/600px-Porsche_Wappen.svg.png' },
  { id: 'toyota', name: 'Toyota', country: 'Japan', category: 'Japanese', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
  { id: 'honda', name: 'Honda', country: 'Japan', category: 'Japanese', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg' },
  { id: 'nissan', name: 'Nissan', country: 'Japan', category: 'Japanese', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Nissan_2020_logo.svg' },
  { id: 'ford', name: 'Ford', country: 'USA', category: 'American', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg' },
  { id: 'chevrolet', name: 'Chevrolet', country: 'USA', category: 'American', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Chevrolet-logo.png' },
  { id: 'tesla', name: 'Tesla', country: 'USA', category: 'Electric', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png' },
  { id: 'ferrari', name: 'Ferrari', country: 'Italy', category: 'Luxury', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d1/Ferrari-Logo.svg' },
  { id: 'lamborghini', name: 'Lamborghini', country: 'Italy', category: 'Luxury', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg' },
];