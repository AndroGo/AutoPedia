import { GoogleGenAI, Type, Schema } from "@google/genai";
import { BrandDetailsData, CarModel, ComparisonResult, Language, SearchResult } from "../types";

// IMPORTANT: process.env.API_KEY must be set in the build/runtime environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

const getLanguageName = (code: Language) => {
  switch(code) {
    case 'az': return "Azerbaijani";
    case 'tr': return "Turkish";
    default: return "English";
  }
};

export const fetchBrandDetails = async (brandName: string, lang: Language): Promise<BrandDetailsData> => {
  const langName = getLanguageName(lang);
  
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      founded: { type: Type.STRING },
      headquarters: { type: Type.STRING },
      history: { type: Type.STRING },
      topModels: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            productionYears: { type: Type.STRING },
            engineType: { type: Type.STRING },
            horsepower: { type: Type.NUMBER },
            torque: { type: Type.STRING },
            acceleration0to100: { type: Type.STRING },
            topSpeed: { type: Type.STRING },
          }
        }
      }
    },
    required: ["name", "history", "topModels"]
  };

  const prompt = `
    Provide a detailed encyclopedia entry for the car brand "${brandName}".
    Language: ${langName}.
    
    Requirements:
    1. History should be a comprehensive summary (2-3 paragraphs).
    2. List 5-6 most legendary or popular models (e.g., for BMW include M5, M3, etc.).
    3. Provide accurate engine specs for the specific top trim of those models.
    
    Return strictly JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as BrandDetailsData;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Gemini Fetch Error:", error);
    throw error;
  }
};

export const compareCars = async (model1: string, model2: string, lang: Language): Promise<ComparisonResult> => {
  const langName = getLanguageName(lang);

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      model1: { 
        type: Type.OBJECT,
        properties: {
           name: { type: Type.STRING },
           horsepower: { type: Type.NUMBER },
           torque: { type: Type.STRING },
           acceleration0to100: { type: Type.STRING },
           topSpeed: { type: Type.STRING },
           engineType: { type: Type.STRING },
           productionYears: { type: Type.STRING },
           weight: { type: Type.STRING },
        }
      },
      model2: { 
         type: Type.OBJECT,
         properties: {
            name: { type: Type.STRING },
            horsepower: { type: Type.NUMBER },
            torque: { type: Type.STRING },
            acceleration0to100: { type: Type.STRING },
            topSpeed: { type: Type.STRING },
            engineType: { type: Type.STRING },
            productionYears: { type: Type.STRING },
            weight: { type: Type.STRING },
         }
      },
      winner: {
        type: Type.OBJECT,
        properties: {
          horsepower: { type: Type.STRING, enum: ['model1', 'model2', 'tie'] },
          acceleration: { type: Type.STRING, enum: ['model1', 'model2', 'tie'] },
          topSpeed: { type: Type.STRING, enum: ['model1', 'model2', 'tie'] },
        }
      },
      summary: { type: Type.STRING }
    }
  };

  const prompt = `
    Compare these two car models: "${model1}" vs "${model2}".
    Language: ${langName}.
    
    Identify the specific top performance trim if the user input is generic (e.g. if "BMW 3 series", assume "BMW M3 Competition").
    Provide exact specs. 
    Determine the winner for each category purely based on specs.
    Write a short summary conclusion comparing driving dynamics or legacy.
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text!) as ComparisonResult;
};

export const searchCars = async (query: string, lang: Language): Promise<SearchResult[]> => {
  const langName = getLanguageName(lang);
  
  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        brand: { type: Type.STRING },
        model: { type: Type.STRING },
        description: { type: Type.STRING }
      }
    }
  };

  const prompt = `
    Search/Filter car database for query: "${query}".
    Language: ${langName}.
    
    If the user asks for "Fastest German cars", list them.
    If the user asks for "BMW", list popular BMW models.
    If the user asks for technical specs like "V12 engine cars", list them.
    
    Provide a list of 5-8 most relevant results. 
    Description should be short (1 sentence).
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  });

  return JSON.parse(response.text!) as SearchResult[];
};