export interface QuizData {
  name: string;
  birthDate: string;
  birthTime?: string;
  zodiacSign?: string;
  
  // Estado emocional
  loveSituation: 'single' | 'dating' | 'relationship';
  biggestDesire: string;
  
  // Personalidade
  adventurousOrHomely: 'adventurous' | 'homely' | 'balanced';
  communicativeOrReserved: 'communicative' | 'reserved' | 'balanced';
  romanticOrPractical: 'romantic' | 'practical' | 'balanced';
  ambitiousOrCalm: 'ambitious' | 'calm' | 'balanced';
  humorType: 'sarcastic' | 'sweet' | 'balanced';
  lifestyle: 'active' | 'relaxed' | 'balanced';
  
  // Aparência
  hairType: 'curly' | 'straight' | 'wavy' | 'bald';
  hairColor: 'black' | 'darkBrown' | 'brown' | 'blonde' | 'red' | 'gray';
  eyeColor: 'brown' | 'blue' | 'green' | 'hazel';
  skinTone: 'fair' | 'light' | 'medium' | 'dark';
  height: 'short' | 'average' | 'tall';
  bodyType: 'slim' | 'athletic' | 'average' | 'muscular' | 'heavyset';
  style: 'casual' | 'elegant' | 'sporty' | 'alternative';
  hasBeard: boolean;
  smileType: 'bright' | 'subtle' | 'mysterious';
  
  // Extras
  specialQuality: string;
  specialDetails?: string;
  cardAcknowledged?: boolean;
  
  // Pacote escolhido
  package?: 'basic' | 'premium' | 'vip';
}

export interface QuizStep {
  id: string;
  title: string;
  description?: string;
  type: 'input' | 'select' | 'multiButton' | 'textarea' | 'cardConnection';
  field: keyof QuizData;
  options?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  validation?: (value: any) => boolean;
  audioMessage?: string;
}

export const zodiacSigns: Record<string, string> = {
  'aries': 'Áries',
  'taurus': 'Touro',
  'gemini': 'Gêmeos',
  'cancer': 'Câncer',
  'leo': 'Leão',
  'virgo': 'Virgem',
  'libra': 'Libra',
  'scorpio': 'Escorpião',
  'sagittarius': 'Sagitário',
  'capricorn': 'Capricórnio',
  'aquarius': 'Aquário',
  'pisces': 'Peixes',
};
