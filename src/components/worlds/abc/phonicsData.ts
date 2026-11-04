/**
 * Little Genius World - Comprehensive Phonics Dataset
 * Clean, research-backed short letter sound representations for early literacy (ages 0-5).
 */

export interface PhonicsWord {
  word: string;
  emoji: string;
}

export interface PhonicsDetail {
  letter: string;
  lower: string;
  ipa: string;             // International phonetic representation
  soundDisplay: string;    // Child-friendly spelling of the sound
  shortSoundSpoken: string;// String fed to speech synthesis for crisp short sound
  isVowel: boolean;
  mouthGuide: string;      // Physical cue for toddlers and parents
  word: string;            // Main reference word
  emoji: string;           // Main emoji
  color: string;
  bgGradient: string;
  exampleWords: PhonicsWord[];
}

export const PHONICS_DATA: PhonicsDetail[] = [
  {
    letter: 'A',
    lower: 'a',
    ipa: '/æ/',
    soundDisplay: 'ah',
    shortSoundSpoken: 'ah',
    isVowel: true,
    mouthGuide: 'Open mouth wide like taking a big bite of an apple: "Ah!"',
    word: 'Apple',
    emoji: '🍎',
    color: '#EF4444',
    bgGradient: 'from-rose-400 to-red-500',
    exampleWords: [
      { word: 'Apple', emoji: '🍎' },
      { word: 'Ant', emoji: '🐜' },
      { word: 'Astronaut', emoji: '🧑‍🚀' }
    ]
  },
  {
    letter: 'B',
    lower: 'b',
    ipa: '/b/',
    soundDisplay: 'buh',
    shortSoundSpoken: 'buh',
    isVowel: false,
    mouthGuide: 'Press both lips together and pop them open: "Buh!"',
    word: 'Ball',
    emoji: '⚽',
    color: '#3B82F6',
    bgGradient: 'from-sky-400 to-blue-600',
    exampleWords: [
      { word: 'Ball', emoji: '⚽' },
      { word: 'Bear', emoji: '🐻' },
      { word: 'Banana', emoji: '🍌' }
    ]
  },
  {
    letter: 'C',
    lower: 'c',
    ipa: '/k/',
    soundDisplay: 'kuh',
    shortSoundSpoken: 'kuh',
    isVowel: false,
    mouthGuide: 'Lift the back of your tongue and make a click: "Kuh!"',
    word: 'Cat',
    emoji: '🐱',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-orange-500',
    exampleWords: [
      { word: 'Cat', emoji: '🐱' },
      { word: 'Car', emoji: '🚗' },
      { word: 'Cake', emoji: '🎂' }
    ]
  },
  {
    letter: 'D',
    lower: 'd',
    ipa: '/d/',
    soundDisplay: 'duh',
    shortSoundSpoken: 'duh',
    isVowel: false,
    mouthGuide: 'Tap the tip of your tongue behind your top teeth: "Duh!"',
    word: 'Dog',
    emoji: '🐶',
    color: '#10B981',
    bgGradient: 'from-emerald-400 to-teal-500',
    exampleWords: [
      { word: 'Dog', emoji: '🐶' },
      { word: 'Duck', emoji: '🦆' },
      { word: 'Drum', emoji: '🥁' }
    ]
  },
  {
    letter: 'E',
    lower: 'e',
    ipa: '/ɛ/',
    soundDisplay: 'eh',
    shortSoundSpoken: 'eh',
    isVowel: true,
    mouthGuide: 'Smile gently and open mouth half-way: "Eh!"',
    word: 'Elephant',
    emoji: '🐘',
    color: '#8B5CF6',
    bgGradient: 'from-purple-400 to-indigo-600',
    exampleWords: [
      { word: 'Elephant', emoji: '🐘' },
      { word: 'Egg', emoji: '🥚' },
      { word: 'Elbow', emoji: '💪' }
    ]
  },
  {
    letter: 'F',
    lower: 'f',
    ipa: '/f/',
    soundDisplay: 'fff',
    shortSoundSpoken: 'fuh',
    isVowel: false,
    mouthGuide: 'Gently bite your lower lip with top teeth and blow air: "Fff!"',
    word: 'Fish',
    emoji: '🐟',
    color: '#06B6D4',
    bgGradient: 'from-cyan-400 to-blue-500',
    exampleWords: [
      { word: 'Fish', emoji: '🐟' },
      { word: 'Frog', emoji: '🐸' },
      { word: 'Fox', emoji: '🦊' }
    ]
  },
  {
    letter: 'G',
    lower: 'g',
    ipa: '/ɡ/',
    soundDisplay: 'guh',
    shortSoundSpoken: 'guh',
    isVowel: false,
    mouthGuide: 'Gargle sound in the back of your throat: "Guh!"',
    word: 'Giraffe',
    emoji: '🦒',
    color: '#EAB308',
    bgGradient: 'from-yellow-400 to-amber-500',
    exampleWords: [
      { word: 'Goat', emoji: '🐐' },
      { word: 'Guitar', emoji: '🎸' },
      { word: 'Grapes', emoji: '🍇' }
    ]
  },
  {
    letter: 'H',
    lower: 'h',
    ipa: '/h/',
    soundDisplay: 'huh',
    shortSoundSpoken: 'huh',
    isVowel: false,
    mouthGuide: 'Breathe out a warm sigh of air on your hands: "Huh!"',
    word: 'House',
    emoji: '🏠',
    color: '#F97316',
    bgGradient: 'from-orange-400 to-red-500',
    exampleWords: [
      { word: 'House', emoji: '🏠' },
      { word: 'Hat', emoji: '🎩' },
      { word: 'Heart', emoji: '💖' }
    ]
  },
  {
    letter: 'I',
    lower: 'i',
    ipa: '/ɪ/',
    soundDisplay: 'ih',
    shortSoundSpoken: 'ih',
    isVowel: true,
    mouthGuide: 'Wiggle your nose like an inky mouse: "Ih!"',
    word: 'Ice cream',
    emoji: '🍦',
    color: '#EC4899',
    bgGradient: 'from-pink-400 to-rose-500',
    exampleWords: [
      { word: 'Igloo', emoji: '🧊' },
      { word: 'Iguana', emoji: '🦎' },
      { word: 'Insects', emoji: '🐞' }
    ]
  },
  {
    letter: 'J',
    lower: 'j',
    ipa: '/dʒ/',
    soundDisplay: 'juh',
    shortSoundSpoken: 'juh',
    isVowel: false,
    mouthGuide: 'Bounce your tongue like a bowl of jelly: "Juh!"',
    word: 'Juice',
    emoji: '🧃',
    color: '#6366F1',
    bgGradient: 'from-indigo-400 to-purple-600',
    exampleWords: [
      { word: 'Juice', emoji: '🧃' },
      { word: 'Jellyfish', emoji: '🪼' },
      { word: 'Jet', emoji: '✈️' }
    ]
  },
  {
    letter: 'K',
    lower: 'k',
    ipa: '/k/',
    soundDisplay: 'kuh',
    shortSoundSpoken: 'kuh',
    isVowel: false,
    mouthGuide: 'Fly your hands high like a kite and click: "Kuh!"',
    word: 'Kite',
    emoji: '🪁',
    color: '#14B8A6',
    bgGradient: 'from-teal-400 to-emerald-600',
    exampleWords: [
      { word: 'Kite', emoji: '🪁' },
      { word: 'Koala', emoji: '🐨' },
      { word: 'Kangaroo', emoji: '🦘' }
    ]
  },
  {
    letter: 'L',
    lower: 'l',
    ipa: '/l/',
    soundDisplay: 'lll',
    shortSoundSpoken: 'luh',
    isVowel: false,
    mouthGuide: 'Press your tongue to the roof of your mouth: "Lll!"',
    word: 'Lion',
    emoji: '🦁',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-yellow-500',
    exampleWords: [
      { word: 'Lion', emoji: '🦁' },
      { word: 'Leaf', emoji: '🍃' },
      { word: 'Lemon', emoji: '🍋' }
    ]
  },
  {
    letter: 'M',
    lower: 'm',
    ipa: '/m/',
    soundDisplay: 'mmm',
    shortSoundSpoken: 'mmm',
    isVowel: false,
    mouthGuide: 'Rub your tummy for yummy food: "Mmmmm!"',
    word: 'Monkey',
    emoji: '🐵',
    color: '#84CC16',
    bgGradient: 'from-lime-400 to-green-600',
    exampleWords: [
      { word: 'Monkey', emoji: '🐵' },
      { word: 'Moon', emoji: '🌙' },
      { word: 'Mango', emoji: '🥭' }
    ]
  },
  {
    letter: 'N',
    lower: 'n',
    ipa: '/n/',
    soundDisplay: 'nnn',
    shortSoundSpoken: 'nnn',
    isVowel: false,
    mouthGuide: 'Spread your arms like an airplane: "Nnnnn!"',
    word: 'Nest',
    emoji: '🪺',
    color: '#0284C7',
    bgGradient: 'from-sky-500 to-blue-600',
    exampleWords: [
      { word: 'Nest', emoji: '🪺' },
      { word: 'Nut', emoji: '🥜' },
      { word: 'Net', emoji: '🥅' }
    ]
  },
  {
    letter: 'O',
    lower: 'o',
    ipa: '/ɒ/',
    soundDisplay: 'aw',
    shortSoundSpoken: 'aw',
    isVowel: true,
    mouthGuide: 'Make a round circle with your lips: "Aw!" (like an octopus)',
    word: 'Orange',
    emoji: '🍊',
    color: '#EA580C',
    bgGradient: 'from-orange-500 to-amber-600',
    exampleWords: [
      { word: 'Octopus', emoji: '🐙' },
      { word: 'Orange', emoji: '🍊' },
      { word: 'Owl', emoji: '🦉' }
    ]
  },
  {
    letter: 'P',
    lower: 'p',
    ipa: '/p/',
    soundDisplay: 'puh',
    shortSoundSpoken: 'puh',
    isVowel: false,
    mouthGuide: 'Pop a puff of air from your lips: "Puh!"',
    word: 'Penguin',
    emoji: '🐧',
    color: '#9333EA',
    bgGradient: 'from-purple-500 to-indigo-600',
    exampleWords: [
      { word: 'Penguin', emoji: '🐧' },
      { word: 'Panda', emoji: '🐼' },
      { word: 'Pear', emoji: '🍐' }
    ]
  },
  {
    letter: 'Q',
    lower: 'q',
    ipa: '/kw/',
    soundDisplay: 'kwuh',
    shortSoundSpoken: 'kwuh',
    isVowel: false,
    mouthGuide: 'Make a little duck beak with your hands: "Kwuh!"',
    word: 'Queen',
    emoji: '👑',
    color: '#DB2777',
    bgGradient: 'from-pink-500 to-rose-600',
    exampleWords: [
      { word: 'Queen', emoji: '👑' },
      { word: 'Quilt', emoji: '🛏️' },
      { word: 'Quick', emoji: '⚡' }
    ]
  },
  {
    letter: 'R',
    lower: 'r',
    ipa: '/r/',
    soundDisplay: 'rrr',
    shortSoundSpoken: 'rrr',
    isVowel: false,
    mouthGuide: 'Curl your tongue back like a racing car: "Rrrrr!"',
    word: 'Rabbit',
    emoji: '🐰',
    color: '#059669',
    bgGradient: 'from-emerald-500 to-teal-700',
    exampleWords: [
      { word: 'Rabbit', emoji: '🐰' },
      { word: 'Rainbow', emoji: '🌈' },
      { word: 'Rocket', emoji: '🚀' }
    ]
  },
  {
    letter: 'S',
    lower: 's',
    ipa: '/s/',
    soundDisplay: 'sss',
    shortSoundSpoken: 'sss',
    isVowel: false,
    mouthGuide: 'Weave your hand like a snake and hiss: "Sssss!"',
    word: 'Sun',
    emoji: '☀️',
    color: '#FBBF24',
    bgGradient: 'from-yellow-400 to-amber-500',
    exampleWords: [
      { word: 'Sun', emoji: '☀️' },
      { word: 'Snake', emoji: '🐍' },
      { word: 'Star', emoji: '⭐' }
    ]
  },
  {
    letter: 'T',
    lower: 't',
    ipa: '/t/',
    soundDisplay: 'tuh',
    shortSoundSpoken: 'tuh',
    isVowel: false,
    mouthGuide: 'Turn head side to side like watching tennis: "Tuh-tuh!"',
    word: 'Tiger',
    emoji: '🐯',
    color: '#F97316',
    bgGradient: 'from-orange-500 to-red-600',
    exampleWords: [
      { word: 'Tiger', emoji: '🐯' },
      { word: 'Turtle', emoji: '🐢' },
      { word: 'Train', emoji: '🚂' }
    ]
  },
  {
    letter: 'U',
    lower: 'u',
    ipa: '/ʌ/',
    soundDisplay: 'uh',
    shortSoundSpoken: 'uh',
    isVowel: true,
    mouthGuide: 'Pretend to open an umbrella: "Uh, uh, up!"',
    word: 'Umbrella',
    emoji: '☂️',
    color: '#4F46E5',
    bgGradient: 'from-indigo-500 to-violet-600',
    exampleWords: [
      { word: 'Umbrella', emoji: '☂️' },
      { word: 'Under', emoji: '👇' },
      { word: 'Up', emoji: '⬆️' }
    ]
  },
  {
    letter: 'V',
    lower: 'v',
    ipa: '/v/',
    soundDisplay: 'vvv',
    shortSoundSpoken: 'vvv',
    isVowel: false,
    mouthGuide: 'Drive a van and buzz your lips: "Vvvvv!"',
    word: 'Violin',
    emoji: '🎻',
    color: '#7C3AED',
    bgGradient: 'from-violet-500 to-purple-700',
    exampleWords: [
      { word: 'Violin', emoji: '🎻' },
      { word: 'Van', emoji: '🚐' },
      { word: 'Vegetable', emoji: '🥕' }
    ]
  },
  {
    letter: 'W',
    lower: 'w',
    ipa: '/w/',
    soundDisplay: 'wuh',
    shortSoundSpoken: 'wuh',
    isVowel: false,
    mouthGuide: 'Blow like the blowing wind: "Wuh! Wuh!"',
    word: 'Whale',
    emoji: '🐳',
    color: '#0284C7',
    bgGradient: 'from-sky-400 to-blue-600',
    exampleWords: [
      { word: 'Whale', emoji: '🐳' },
      { word: 'Water', emoji: '💧' },
      { word: 'Windmill', emoji: '🌬️' }
    ]
  },
  {
    letter: 'X',
    lower: 'x',
    ipa: '/ks/',
    soundDisplay: 'ks',
    shortSoundSpoken: 'ks',
    isVowel: false,
    mouthGuide: 'Cross your arms into an X and whisper: "Ks! Ks!"',
    word: 'Xylophone',
    emoji: '🎶',
    color: '#0D9488',
    bgGradient: 'from-teal-400 to-emerald-500',
    exampleWords: [
      { word: 'Xylophone', emoji: '🎶' },
      { word: 'Box', emoji: '📦' },
      { word: 'Fox', emoji: '🦊' }
    ]
  },
  {
    letter: 'Y',
    lower: 'y',
    ipa: '/j/',
    soundDisplay: 'yuh',
    shortSoundSpoken: 'yuh',
    isVowel: false,
    mouthGuide: 'Pretend to eat delicious yogurt: "Yuh, yummy!"',
    word: 'Yak',
    emoji: '🐂',
    color: '#B45309',
    bgGradient: 'from-amber-600 to-yellow-700',
    exampleWords: [
      { word: 'Yak', emoji: '🐂' },
      { word: 'Yacht', emoji: '⛵' },
      { word: 'Yo-yo', emoji: '🪀' }
    ]
  },
  {
    letter: 'Z',
    lower: 'z',
    ipa: '/z/',
    soundDisplay: 'zzz',
    shortSoundSpoken: 'zzz',
    isVowel: false,
    mouthGuide: 'Flap like a busy bumblebee and buzz: "Zzzzz!"',
    word: 'Zebra',
    emoji: '🦓',
    color: '#475569',
    bgGradient: 'from-slate-600 to-slate-900',
    exampleWords: [
      { word: 'Zebra', emoji: '🦓' },
      { word: 'Zipper', emoji: '🤐' },
      { word: 'Zoo', emoji: '🦁' }
    ]
  }
];
