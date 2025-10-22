export interface QuizData {
  name?: string;
  birthDate?: string;
  gender?: string;
  height?: string;
  bodyType?: string;
  hairColor?: string;
  hairType?: string;
  eyeColor?: string;
  skinTone?: string;
  personality?: string;
  interests?: string;
  communication?: string;
  lifestyle?: string;
  values?: string;
  [key: string]: any;
}

export interface QuizStep {
  id: number;
  question: string;
  type: 'text' | 'date' | 'select' | 'multiselect' | 'image-select' | 'slider' | 'avatar-builder' | 'interlude';
  options?: any[];
  field?: string;
  placeholder?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  [key: string]: any;
}

export interface CosmicCard {
  image: string;
  name: string;
  meaning: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
