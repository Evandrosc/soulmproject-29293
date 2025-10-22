import { QuizData } from '@/types/quiz';

export function generatePersonalizedText(quizData: Partial<QuizData>, userCity?: string): string {
  const { name, loveSituation, biggestDesire } = quizData;
  
  if (!name || !loveSituation || !biggestDesire) {
    return '';
  }
  
  // Texts based on love situation
  const situationTexts = {
    relationship: `${name}, cosmic energies reveal that your current connection has extraordinary growth potential`,
    dating: `${name}, the universe is aligning the stars for you to recognize important signs in this person you're getting to know`,
    single: `${name}, your soulmate is energetically closer than you imagine`
  };

  // Texts based on desire
  const desireTexts = {
    connection: 'Your search for deep connection resonates with the highest vibrations of the universe',
    passion: 'The flame of passion you seek burns intensely on the astral plane',
    stability: 'The stability your heart yearns for is being carefully prepared by destiny',
    growth: 'Your desire for mutual growth is what most strengthens true bonds',
    companionship: 'The companionship you value is the foundation of all lasting connections'
  };

  // Personality details
  const personalityTraits: string[] = [];
  
  if (quizData.adventurousOrHomely === 'adventurous') {
    personalityTraits.push('an adventurous spirit that complements your energy');
  } else if (quizData.adventurousOrHomely === 'homely') {
    personalityTraits.push('a nurturing nature that creates a true home');
  }

  if (quizData.communicativeOrReserved === 'communicative') {
    personalityTraits.push('open communication that nurtures intimacy');
  } else if (quizData.communicativeOrReserved === 'reserved') {
    personalityTraits.push('silent depth that speaks louder than words');
  }

  if (quizData.romanticOrPractical === 'romantic') {
    personalityTraits.push('romanticism that keeps the flame alive');
  } else if (quizData.romanticOrPractical === 'practical') {
    personalityTraits.push('loving practicality that builds solid foundations');
  }

  // Physical characteristics
  const physicalDetails: string[] = [];
  
  const hairColors = {
    black: 'black hair like the night',
    darkBrown: 'deep dark-brown hair',
    brown: 'warm brown hair',
    blonde: 'radiant blonde hair',
    red: 'fiery red hair',
    gray: 'wise gray hair'
  };
  
  const eyeColors = {
    brown: 'deep brown eyes',
    blue: 'blue eyes like the sky',
    green: 'mesmerizing green eyes',
    hazel: 'enchanting hazel eyes'
  };

  const skinTones = {
    fair: 'fair skin',
    light: 'light-tan skin',
    medium: 'medium-tan skin',
    dark: 'dark skin'
  };

  if (quizData.hairColor && hairColors[quizData.hairColor]) {
    physicalDetails.push(hairColors[quizData.hairColor]);
  }
  
  if (quizData.eyeColor && eyeColors[quizData.eyeColor]) {
    physicalDetails.push(eyeColors[quizData.eyeColor]);
  }

  if (quizData.skinTone && skinTones[quizData.skinTone]) {
    physicalDetails.push(skinTones[quizData.skinTone]);
  }

  // Special quality
  const specialQualities = {
    intelligence: 'an intelligence that illuminates conversations',
    kindness: 'a kindness that warms the heart',
    confidence: 'a confidence that inspires security',
    sensitivity: 'a sensitivity that understands without words',
    leadership: 'a natural leadership that guides with wisdom'
  };

  const specialQuality = quizData.specialQuality ? specialQualities[quizData.specialQuality as keyof typeof specialQualities] : '';

  // Building the final text
  const physicalDescription = physicalDetails.length > 0 ? physicalDetails.join(', ') : 'unique characteristics';
  const heightDesc = quizData.height === 'tall' ? 'with a striking presence due to height' : quizData.height === 'short' ? 'with a charismatic presence' : 'with balanced proportions';
  const bodyDesc = quizData.bodyType === 'athletic' ? 'athletic body' : quizData.bodyType === 'muscular' ? 'muscular build' : quizData.bodyType === 'slim' ? 'slender frame' : quizData.bodyType === 'heavyset' ? 'welcoming fuller body' : 'balanced physique';
  const beardDesc = quizData.hasBeard ? 'a beard that adds maturity' : 'a defined face';
  const smileDesc = quizData.smileType === 'bright' ? 'Their radiant smile lights up any room' : quizData.smileType === 'mysterious' ? 'Their mysterious smile carries a unique magnetism' : 'Their subtle smile reveals genuine kindness';

  const cityText = userCity && userCity !== 'your city' 
    ? `The stars indicate that this person is energetically connected to the ${userCity} region.` 
    : 'The universe is aligning your paths.';

  return `
${situationTexts[loveSituation]}. ${desireTexts[biggestDesire]}.

The stars reveal a person with ${personalityTraits.join(', ')}. ${specialQuality ? `Above all, they possess ${specialQuality}.` : ''}

Physically, the universe draws someone with ${physicalDescription}, ${heightDesc}, ${bodyDesc}, and ${beardDesc}. ${smileDesc}.

${cityText}

${name}, every detail you visualized is not a coincidence - it's the universe responding to your deepest desires. This person exists and cosmic energy is working to bring you together.
  `.trim();
}
