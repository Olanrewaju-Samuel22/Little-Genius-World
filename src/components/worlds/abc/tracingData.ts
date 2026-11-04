export interface Waypoint {
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
}

export interface LetterStroke {
  id: number;
  pathD: string;
  checkpoints: Waypoint[];
  startPoint: Waypoint;
  directionHint: string;
  angle: number; // In degrees for directional arrow icon
}

export interface TracingLetter {
  letter: string;
  lower: string;
  word: string;
  emoji: string;
  sound: string;
  phonicsIntro: string;
  color: string;
  bgGradient: string;
  upperStrokes: LetterStroke[];
  lowerStrokes: LetterStroke[];
}

export const TRACING_LETTERS: TracingLetter[] = [
  {
    letter: 'A',
    lower: 'a',
    word: 'Apple',
    emoji: '🍎',
    sound: 'ah',
    phonicsIntro: 'A says ah! A is for Apple!',
    color: '#EF4444',
    bgGradient: 'from-red-400 to-rose-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 50 16 L 20 84',
        checkpoints: [{ x: 50, y: 16 }, { x: 40, y: 38 }, { x: 30, y: 61 }, { x: 20, y: 84 }],
        startPoint: { x: 50, y: 16 },
        directionHint: 'Slide down left',
        angle: 115
      },
      {
        id: 2,
        pathD: 'M 50 16 L 80 84',
        checkpoints: [{ x: 50, y: 16 }, { x: 60, y: 38 }, { x: 70, y: 61 }, { x: 80, y: 84 }],
        startPoint: { x: 50, y: 16 },
        directionHint: 'Slide down right',
        angle: 65
      },
      {
        id: 3,
        pathD: 'M 32 56 L 68 56',
        checkpoints: [{ x: 32, y: 56 }, { x: 50, y: 56 }, { x: 68, y: 56 }],
        startPoint: { x: 32, y: 56 },
        directionHint: 'Cross the bridge',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 68 46 C 62 36 38 36 38 58 C 38 78 62 78 68 68',
        checkpoints: [{ x: 68, y: 46 }, { x: 52, y: 38 }, { x: 38, y: 58 }, { x: 52, y: 78 }, { x: 68, y: 68 }],
        startPoint: { x: 68, y: 46 },
        directionHint: 'Curve around',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 68 38 L 68 78',
        checkpoints: [{ x: 68, y: 38 }, { x: 68, y: 58 }, { x: 68, y: 78 }],
        startPoint: { x: 68, y: 38 },
        directionHint: 'Slide down the stem',
        angle: 90
      }
    ]
  },
  {
    letter: 'B',
    lower: 'b',
    word: 'Ball',
    emoji: '⚽',
    sound: 'buh',
    phonicsIntro: 'B says buh! B is for Ball!',
    color: '#3B82F6',
    bgGradient: 'from-blue-400 to-indigo-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 28 16 L 28 84',
        checkpoints: [{ x: 28, y: 16 }, { x: 28, y: 38 }, { x: 28, y: 61 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Straight line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 28 16 C 66 16 66 50 28 50',
        checkpoints: [{ x: 28, y: 16 }, { x: 54, y: 16 }, { x: 66, y: 33 }, { x: 54, y: 50 }, { x: 28, y: 50 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'First round tummy',
        angle: 0
      },
      {
        id: 3,
        pathD: 'M 28 50 C 72 50 72 84 28 84',
        checkpoints: [{ x: 28, y: 50 }, { x: 60, y: 50 }, { x: 72, y: 67 }, { x: 60, y: 84 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 50 },
        directionHint: 'Second round tummy',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 16 L 32 84',
        checkpoints: [{ x: 32, y: 16 }, { x: 32, y: 38 }, { x: 32, y: 61 }, { x: 32, y: 84 }],
        startPoint: { x: 32, y: 16 },
        directionHint: 'Tall line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 32 50 C 72 40 72 82 32 82',
        checkpoints: [{ x: 32, y: 50 }, { x: 55, y: 42 }, { x: 70, y: 62 }, { x: 55, y: 82 }, { x: 32, y: 82 }],
        startPoint: { x: 32, y: 50 },
        directionHint: 'Bounce around the loop',
        angle: 45
      }
    ]
  },
  {
    letter: 'C',
    lower: 'c',
    word: 'Cat',
    emoji: '🐱',
    sound: 'kuh',
    phonicsIntro: 'C says kuh! C is for Cat!',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-orange-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 78 28 C 50 14 22 34 22 50 C 22 66 50 86 78 72',
        checkpoints: [{ x: 78, y: 28 }, { x: 50, y: 16 }, { x: 22, y: 50 }, { x: 50, y: 84 }, { x: 78, y: 72 }],
        startPoint: { x: 78, y: 28 },
        directionHint: 'Curve like a crescent moon',
        angle: 180
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 72 44 C 52 34 32 46 32 60 C 32 74 52 84 72 74',
        checkpoints: [{ x: 72, y: 44 }, { x: 52, y: 36 }, { x: 32, y: 60 }, { x: 52, y: 82 }, { x: 72, y: 74 }],
        startPoint: { x: 72, y: 44 },
        directionHint: 'Little curve around',
        angle: 180
      }
    ]
  },
  {
    letter: 'D',
    lower: 'd',
    word: 'Dog',
    emoji: '🐶',
    sound: 'duh',
    phonicsIntro: 'D says duh! D is for Dog!',
    color: '#10B981',
    bgGradient: 'from-emerald-400 to-teal-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 28 16 L 28 84',
        checkpoints: [{ x: 28, y: 16 }, { x: 28, y: 38 }, { x: 28, y: 61 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Line straight down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 28 16 C 80 16 80 84 28 84',
        checkpoints: [{ x: 28, y: 16 }, { x: 60, y: 16 }, { x: 78, y: 50 }, { x: 60, y: 84 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Big belly bow',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 68 50 C 30 40 30 82 68 82',
        checkpoints: [{ x: 68, y: 50 }, { x: 46, y: 42 }, { x: 30, y: 62 }, { x: 46, y: 82 }, { x: 68, y: 82 }],
        startPoint: { x: 68, y: 50 },
        directionHint: 'Round belly',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 68 16 L 68 84',
        checkpoints: [{ x: 68, y: 16 }, { x: 68, y: 38 }, { x: 68, y: 61 }, { x: 68, y: 84 }],
        startPoint: { x: 68, y: 16 },
        directionHint: 'Tall stick down',
        angle: 90
      }
    ]
  },
  {
    letter: 'E',
    lower: 'e',
    word: 'Elephant',
    emoji: '🐘',
    sound: 'eh',
    phonicsIntro: 'E says eh! E is for Elephant!',
    color: '#8B5CF6',
    bgGradient: 'from-violet-400 to-purple-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 28 16 L 28 84',
        checkpoints: [{ x: 28, y: 16 }, { x: 28, y: 50 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Straight down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 28 16 L 76 16',
        checkpoints: [{ x: 28, y: 16 }, { x: 52, y: 16 }, { x: 76, y: 16 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Top branch across',
        angle: 0
      },
      {
        id: 3,
        pathD: 'M 28 50 L 68 50',
        checkpoints: [{ x: 28, y: 50 }, { x: 48, y: 50 }, { x: 68, y: 50 }],
        startPoint: { x: 28, y: 50 },
        directionHint: 'Middle branch',
        angle: 0
      },
      {
        id: 4,
        pathD: 'M 28 84 L 76 84',
        checkpoints: [{ x: 28, y: 84 }, { x: 52, y: 84 }, { x: 76, y: 84 }],
        startPoint: { x: 28, y: 84 },
        directionHint: 'Bottom branch',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 58 L 70 58',
        checkpoints: [{ x: 32, y: 58 }, { x: 51, y: 58 }, { x: 70, y: 58 }],
        startPoint: { x: 32, y: 58 },
        directionHint: 'Slide across',
        angle: 0
      },
      {
        id: 2,
        pathD: 'M 70 58 C 70 38 32 38 32 60 C 32 80 68 82 72 74',
        checkpoints: [{ x: 70, y: 58 }, { x: 51, y: 38 }, { x: 32, y: 60 }, { x: 51, y: 80 }, { x: 72, y: 74 }],
        startPoint: { x: 70, y: 58 },
        directionHint: 'Over the top and round',
        angle: 135
      }
    ]
  },
  {
    letter: 'F',
    lower: 'f',
    word: 'Fish',
    emoji: '🐟',
    sound: 'fff',
    phonicsIntro: 'F says fff! F is for Fish!',
    color: '#06B6D4',
    bgGradient: 'from-cyan-400 to-blue-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 30 16 L 30 84',
        checkpoints: [{ x: 30, y: 16 }, { x: 30, y: 50 }, { x: 30, y: 84 }],
        startPoint: { x: 30, y: 16 },
        directionHint: 'Line straight down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 30 16 L 76 16',
        checkpoints: [{ x: 30, y: 16 }, { x: 53, y: 16 }, { x: 76, y: 16 }],
        startPoint: { x: 30, y: 16 },
        directionHint: 'Top line across',
        angle: 0
      },
      {
        id: 3,
        pathD: 'M 30 50 L 66 50',
        checkpoints: [{ x: 30, y: 50 }, { x: 48, y: 50 }, { x: 66, y: 50 }],
        startPoint: { x: 30, y: 50 },
        directionHint: 'Middle line across',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 68 24 C 54 14 46 22 46 36 L 46 84',
        checkpoints: [{ x: 68, y: 24 }, { x: 52, y: 16 }, { x: 46, y: 36 }, { x: 46, y: 60 }, { x: 46, y: 84 }],
        startPoint: { x: 68, y: 24 },
        directionHint: 'Candy cane hook down',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 32 46 L 62 46',
        checkpoints: [{ x: 32, y: 46 }, { x: 47, y: 46 }, { x: 62, y: 46 }],
        startPoint: { x: 32, y: 46 },
        directionHint: 'Cross in the middle',
        angle: 0
      }
    ]
  },
  {
    letter: 'G',
    lower: 'g',
    word: 'Giraffe',
    emoji: '🦒',
    sound: 'guh',
    phonicsIntro: 'G says guh! G is for Giraffe!',
    color: '#EC4899',
    bgGradient: 'from-pink-400 to-rose-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 78 28 C 50 14 22 34 22 50 C 22 66 50 86 78 72 L 78 52',
        checkpoints: [{ x: 78, y: 28 }, { x: 50, y: 16 }, { x: 22, y: 50 }, { x: 50, y: 84 }, { x: 78, y: 72 }, { x: 78, y: 52 }],
        startPoint: { x: 78, y: 28 },
        directionHint: 'Big curve up to shelf',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 56 52 L 78 52',
        checkpoints: [{ x: 56, y: 52 }, { x: 67, y: 52 }, { x: 78, y: 52 }],
        startPoint: { x: 56, y: 52 },
        directionHint: 'Step inside',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 68 46 C 62 36 38 36 38 58 C 38 78 62 78 68 68',
        checkpoints: [{ x: 68, y: 46 }, { x: 52, y: 38 }, { x: 38, y: 58 }, { x: 52, y: 76 }, { x: 68, y: 68 }],
        startPoint: { x: 68, y: 46 },
        directionHint: 'Loop around',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 68 38 L 68 84 C 68 94 48 94 38 86',
        checkpoints: [{ x: 68, y: 38 }, { x: 68, y: 65 }, { x: 68, y: 84 }, { x: 53, y: 92 }, { x: 38, y: 86 }],
        startPoint: { x: 68, y: 38 },
        directionHint: 'Down and hook',
        angle: 90
      }
    ]
  },
  {
    letter: 'H',
    lower: 'h',
    word: 'House',
    emoji: '🏠',
    sound: 'huh',
    phonicsIntro: 'H says huh! H is for House!',
    color: '#6366F1',
    bgGradient: 'from-indigo-400 to-purple-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 26 16 L 26 84',
        checkpoints: [{ x: 26, y: 16 }, { x: 26, y: 50 }, { x: 26, y: 84 }],
        startPoint: { x: 26, y: 16 },
        directionHint: 'Left wall down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 74 16 L 74 84',
        checkpoints: [{ x: 74, y: 16 }, { x: 74, y: 50 }, { x: 74, y: 84 }],
        startPoint: { x: 74, y: 16 },
        directionHint: 'Right wall down',
        angle: 90
      },
      {
        id: 3,
        pathD: 'M 26 50 L 74 50',
        checkpoints: [{ x: 26, y: 50 }, { x: 50, y: 50 }, { x: 74, y: 50 }],
        startPoint: { x: 26, y: 50 },
        directionHint: 'Bridge across',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 16 L 32 84',
        checkpoints: [{ x: 32, y: 16 }, { x: 32, y: 50 }, { x: 32, y: 84 }],
        startPoint: { x: 32, y: 16 },
        directionHint: 'Tall pole down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 32 50 C 42 38 68 38 68 54 L 68 84',
        checkpoints: [{ x: 32, y: 50 }, { x: 50, y: 38 }, { x: 68, y: 54 }, { x: 68, y: 84 }],
        startPoint: { x: 32, y: 50 },
        directionHint: 'Hop over the arch',
        angle: 45
      }
    ]
  },
  {
    letter: 'I',
    lower: 'i',
    word: 'Ice cream',
    emoji: '🍦',
    sound: 'ih',
    phonicsIntro: 'I says ih! I is for Ice cream!',
    color: '#14B8A6',
    bgGradient: 'from-teal-400 to-emerald-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 50 16 L 50 84',
        checkpoints: [{ x: 50, y: 16 }, { x: 50, y: 50 }, { x: 50, y: 84 }],
        startPoint: { x: 50, y: 16 },
        directionHint: 'Straight line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 30 16 L 70 16',
        checkpoints: [{ x: 30, y: 16 }, { x: 50, y: 16 }, { x: 70, y: 16 }],
        startPoint: { x: 30, y: 16 },
        directionHint: 'Top roof across',
        angle: 0
      },
      {
        id: 3,
        pathD: 'M 30 84 L 70 84',
        checkpoints: [{ x: 30, y: 84 }, { x: 50, y: 84 }, { x: 70, y: 84 }],
        startPoint: { x: 30, y: 84 },
        directionHint: 'Bottom floor across',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 50 42 L 50 84',
        checkpoints: [{ x: 50, y: 42 }, { x: 50, y: 63 }, { x: 50, y: 84 }],
        startPoint: { x: 50, y: 42 },
        directionHint: 'Short line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 50 25 L 50 27',
        checkpoints: [{ x: 50, y: 26 }],
        startPoint: { x: 50, y: 26 },
        directionHint: 'Tap the dot!',
        angle: 90
      }
    ]
  },
  {
    letter: 'J',
    lower: 'j',
    word: 'Juice',
    emoji: '🧃',
    sound: 'juh',
    phonicsIntro: 'J says juh! J is for Juice!',
    color: '#F97316',
    bgGradient: 'from-orange-400 to-amber-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 65 16 L 65 72 C 65 86 42 86 32 74',
        checkpoints: [{ x: 65, y: 16 }, { x: 65, y: 45 }, { x: 65, y: 72 }, { x: 50, y: 84 }, { x: 32, y: 74 }],
        startPoint: { x: 65, y: 16 },
        directionHint: 'Slide down and hook up',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 45 16 L 85 16',
        checkpoints: [{ x: 45, y: 16 }, { x: 65, y: 16 }, { x: 85, y: 16 }],
        startPoint: { x: 45, y: 16 },
        directionHint: 'Hat across the top',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 56 42 L 56 82 C 56 94 38 94 28 84',
        checkpoints: [{ x: 56, y: 42 }, { x: 56, y: 64 }, { x: 56, y: 82 }, { x: 44, y: 92 }, { x: 28, y: 84 }],
        startPoint: { x: 56, y: 42 },
        directionHint: 'Down deep and hook',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 56 26 L 56 28',
        checkpoints: [{ x: 56, y: 27 }],
        startPoint: { x: 56, y: 27 },
        directionHint: 'Dot on top!',
        angle: 90
      }
    ]
  },
  {
    letter: 'K',
    lower: 'k',
    word: 'Kite',
    emoji: '🪁',
    sound: 'kuh',
    phonicsIntro: 'K says kuh! K is for Kite!',
    color: '#84CC16',
    bgGradient: 'from-lime-400 to-emerald-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 30 16 L 30 84',
        checkpoints: [{ x: 30, y: 16 }, { x: 30, y: 50 }, { x: 30, y: 84 }],
        startPoint: { x: 30, y: 16 },
        directionHint: 'Tall post down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 72 20 L 32 54',
        checkpoints: [{ x: 72, y: 20 }, { x: 52, y: 37 }, { x: 32, y: 54 }],
        startPoint: { x: 72, y: 20 },
        directionHint: 'Slide down to middle',
        angle: 220
      },
      {
        id: 3,
        pathD: 'M 42 46 L 76 84',
        checkpoints: [{ x: 42, y: 46 }, { x: 59, y: 65 }, { x: 76, y: 84 }],
        startPoint: { x: 42, y: 46 },
        directionHint: 'Kick leg out',
        angle: 45
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 16 L 32 84',
        checkpoints: [{ x: 32, y: 16 }, { x: 32, y: 50 }, { x: 32, y: 84 }],
        startPoint: { x: 32, y: 16 },
        directionHint: 'Tall pole down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 66 42 L 34 64',
        checkpoints: [{ x: 66, y: 42 }, { x: 50, y: 53 }, { x: 34, y: 64 }],
        startPoint: { x: 66, y: 42 },
        directionHint: 'Slant in',
        angle: 215
      },
      {
        id: 3,
        pathD: 'M 44 56 L 68 84',
        checkpoints: [{ x: 44, y: 56 }, { x: 56, y: 70 }, { x: 68, y: 84 }],
        startPoint: { x: 44, y: 56 },
        directionHint: 'Kick out',
        angle: 50
      }
    ]
  },
  {
    letter: 'L',
    lower: 'l',
    word: 'Lion',
    emoji: '🦁',
    sound: 'lll',
    phonicsIntro: 'L says lll! L is for Lion!',
    color: '#F59E0B',
    bgGradient: 'from-amber-400 to-yellow-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 30 16 L 30 84',
        checkpoints: [{ x: 30, y: 16 }, { x: 30, y: 50 }, { x: 30, y: 84 }],
        startPoint: { x: 30, y: 16 },
        directionHint: 'Line straight down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 30 84 L 75 84',
        checkpoints: [{ x: 30, y: 84 }, { x: 52, y: 84 }, { x: 75, y: 84 }],
        startPoint: { x: 30, y: 84 },
        directionHint: 'Foot across bottom',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 50 16 L 50 80 C 50 84 56 86 64 84',
        checkpoints: [{ x: 50, y: 16 }, { x: 50, y: 50 }, { x: 50, y: 80 }, { x: 64, y: 84 }],
        startPoint: { x: 50, y: 16 },
        directionHint: 'Straight stick with a baby curl',
        angle: 90
      }
    ]
  },
  {
    letter: 'M',
    lower: 'm',
    word: 'Monkey',
    emoji: '🐵',
    sound: 'mmm',
    phonicsIntro: 'M says mmm! M is for Monkey!',
    color: '#0EA5E9',
    bgGradient: 'from-sky-400 to-blue-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 22 84 L 22 18',
        checkpoints: [{ x: 22, y: 84 }, { x: 22, y: 51 }, { x: 22, y: 18 }],
        startPoint: { x: 22, y: 84 },
        directionHint: 'Climb up left mountain',
        angle: 270
      },
      {
        id: 2,
        pathD: 'M 22 18 L 50 64',
        checkpoints: [{ x: 22, y: 18 }, { x: 36, y: 41 }, { x: 50, y: 64 }],
        startPoint: { x: 22, y: 18 },
        directionHint: 'Slide down valley',
        angle: 60
      },
      {
        id: 3,
        pathD: 'M 50 64 L 78 18',
        checkpoints: [{ x: 50, y: 64 }, { x: 64, y: 41 }, { x: 78, y: 18 }],
        startPoint: { x: 50, y: 64 },
        directionHint: 'Climb up next peak',
        angle: 300
      },
      {
        id: 4,
        pathD: 'M 78 18 L 78 84',
        checkpoints: [{ x: 78, y: 18 }, { x: 78, y: 51 }, { x: 78, y: 84 }],
        startPoint: { x: 78, y: 18 },
        directionHint: 'Slide down right mountain',
        angle: 90
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 24 42 L 24 84',
        checkpoints: [{ x: 24, y: 42 }, { x: 24, y: 63 }, { x: 24, y: 84 }],
        startPoint: { x: 24, y: 42 },
        directionHint: 'Short line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 24 52 C 34 38 52 38 52 54 L 52 84',
        checkpoints: [{ x: 24, y: 52 }, { x: 38, y: 40 }, { x: 52, y: 54 }, { x: 52, y: 84 }],
        startPoint: { x: 24, y: 52 },
        directionHint: 'First gentle hop',
        angle: 45
      },
      {
        id: 3,
        pathD: 'M 52 52 C 62 38 80 38 80 54 L 80 84',
        checkpoints: [{ x: 52, y: 52 }, { x: 66, y: 40 }, { x: 80, y: 54 }, { x: 80, y: 84 }],
        startPoint: { x: 52, y: 52 },
        directionHint: 'Second gentle hop',
        angle: 45
      }
    ]
  },
  {
    letter: 'N',
    lower: 'n',
    word: 'Nest',
    emoji: '🪺',
    sound: 'nnn',
    phonicsIntro: 'N says nnn! N is for Nest!',
    color: '#A855F7',
    bgGradient: 'from-purple-400 to-fuchsia-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 26 84 L 26 18',
        checkpoints: [{ x: 26, y: 84 }, { x: 26, y: 51 }, { x: 26, y: 18 }],
        startPoint: { x: 26, y: 84 },
        directionHint: 'Climb straight up',
        angle: 270
      },
      {
        id: 2,
        pathD: 'M 26 18 L 74 84',
        checkpoints: [{ x: 26, y: 18 }, { x: 50, y: 51 }, { x: 74, y: 84 }],
        startPoint: { x: 26, y: 18 },
        directionHint: 'Slant slide all the way down',
        angle: 55
      },
      {
        id: 3,
        pathD: 'M 74 84 L 74 18',
        checkpoints: [{ x: 74, y: 84 }, { x: 74, y: 51 }, { x: 74, y: 18 }],
        startPoint: { x: 74, y: 84 },
        directionHint: 'Climb straight up',
        angle: 270
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 30 42 L 30 84',
        checkpoints: [{ x: 30, y: 42 }, { x: 30, y: 63 }, { x: 30, y: 84 }],
        startPoint: { x: 30, y: 42 },
        directionHint: 'Line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 30 52 C 42 38 70 38 70 54 L 70 84',
        checkpoints: [{ x: 30, y: 52 }, { x: 50, y: 38 }, { x: 70, y: 54 }, { x: 70, y: 84 }],
        startPoint: { x: 30, y: 52 },
        directionHint: 'Hop over the tunnel',
        angle: 45
      }
    ]
  },
  {
    letter: 'O',
    lower: 'o',
    word: 'Orange',
    emoji: '🍊',
    sound: 'ah',
    phonicsIntro: 'O says ah! O is for Orange!',
    color: '#F97316',
    bgGradient: 'from-orange-400 to-amber-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 50 16 C 20 16 20 84 50 84 C 80 84 80 16 50 16',
        checkpoints: [{ x: 50, y: 16 }, { x: 24, y: 35 }, { x: 24, y: 65 }, { x: 50, y: 84 }, { x: 76, y: 65 }, { x: 76, y: 35 }, { x: 50, y: 16 }],
        startPoint: { x: 50, y: 16 },
        directionHint: 'Big round circle all the way around',
        angle: 180
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 50 40 C 28 40 28 80 50 80 C 72 80 72 40 50 40',
        checkpoints: [{ x: 50, y: 40 }, { x: 32, y: 52 }, { x: 32, y: 68 }, { x: 50, y: 80 }, { x: 68, y: 68 }, { x: 68, y: 52 }, { x: 50, y: 40 }],
        startPoint: { x: 50, y: 40 },
        directionHint: 'Little circle wheel',
        angle: 180
      }
    ]
  },
  {
    letter: 'P',
    lower: 'p',
    word: 'Penguin',
    emoji: '🐧',
    sound: 'puh',
    phonicsIntro: 'P says puh! P is for Penguin!',
    color: '#0284C7',
    bgGradient: 'from-sky-500 to-indigo-600',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 28 16 L 28 84',
        checkpoints: [{ x: 28, y: 16 }, { x: 28, y: 50 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Line straight down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 28 16 C 72 16 72 54 28 54',
        checkpoints: [{ x: 28, y: 16 }, { x: 58, y: 16 }, { x: 72, y: 35 }, { x: 58, y: 54 }, { x: 28, y: 54 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Round top balloon',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 40 L 32 94',
        checkpoints: [{ x: 32, y: 40 }, { x: 32, y: 67 }, { x: 32, y: 94 }],
        startPoint: { x: 32, y: 40 },
        directionHint: 'Dip down low',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 32 48 C 72 40 72 80 32 80',
        checkpoints: [{ x: 32, y: 48 }, { x: 56, y: 42 }, { x: 70, y: 62 }, { x: 56, y: 80 }, { x: 32, y: 80 }],
        startPoint: { x: 32, y: 48 },
        directionHint: 'Curve around the side',
        angle: 45
      }
    ]
  },
  {
    letter: 'Q',
    lower: 'q',
    word: 'Queen',
    emoji: '👑',
    sound: 'kwuh',
    phonicsIntro: 'Q says kwuh! Q is for Queen!',
    color: '#D946EF',
    bgGradient: 'from-fuchsia-400 to-pink-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 50 16 C 20 16 20 84 50 84 C 80 84 80 16 50 16',
        checkpoints: [{ x: 50, y: 16 }, { x: 24, y: 35 }, { x: 24, y: 65 }, { x: 50, y: 84 }, { x: 76, y: 65 }, { x: 76, y: 35 }, { x: 50, y: 16 }],
        startPoint: { x: 50, y: 16 },
        directionHint: 'Circle all the way around',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 56 62 L 80 86',
        checkpoints: [{ x: 56, y: 62 }, { x: 68, y: 74 }, { x: 80, y: 86 }],
        startPoint: { x: 56, y: 62 },
        directionHint: 'Little kicking foot',
        angle: 45
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 68 50 C 30 40 30 82 68 82',
        checkpoints: [{ x: 68, y: 50 }, { x: 46, y: 42 }, { x: 30, y: 62 }, { x: 46, y: 82 }, { x: 68, y: 82 }],
        startPoint: { x: 68, y: 50 },
        directionHint: 'Round belly',
        angle: 180
      },
      {
        id: 2,
        pathD: 'M 68 40 L 68 94 C 68 94 76 90 82 86',
        checkpoints: [{ x: 68, y: 40 }, { x: 68, y: 67 }, { x: 68, y: 94 }, { x: 80, y: 86 }],
        startPoint: { x: 68, y: 40 },
        directionHint: 'Slide down and flick tail',
        angle: 90
      }
    ]
  },
  {
    letter: 'R',
    lower: 'r',
    word: 'Rabbit',
    emoji: '🐰',
    sound: 'rrr',
    phonicsIntro: 'R says rrr! R is for Rabbit!',
    color: '#10B981',
    bgGradient: 'from-emerald-400 to-teal-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 28 16 L 28 84',
        checkpoints: [{ x: 28, y: 16 }, { x: 28, y: 50 }, { x: 28, y: 84 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Straight line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 28 16 C 72 16 72 52 28 52',
        checkpoints: [{ x: 28, y: 16 }, { x: 58, y: 16 }, { x: 72, y: 34 }, { x: 58, y: 52 }, { x: 28, y: 52 }],
        startPoint: { x: 28, y: 16 },
        directionHint: 'Round loop',
        angle: 0
      },
      {
        id: 3,
        pathD: 'M 46 52 L 76 84',
        checkpoints: [{ x: 46, y: 52 }, { x: 61, y: 68 }, { x: 76, y: 84 }],
        startPoint: { x: 46, y: 52 },
        directionHint: 'Slide leg out',
        angle: 45
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 35 42 L 35 84',
        checkpoints: [{ x: 35, y: 42 }, { x: 35, y: 63 }, { x: 35, y: 84 }],
        startPoint: { x: 35, y: 42 },
        directionHint: 'Line down',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 35 54 C 44 42 60 40 70 46',
        checkpoints: [{ x: 35, y: 54 }, { x: 52, y: 42 }, { x: 70, y: 46 }],
        startPoint: { x: 35, y: 54 },
        directionHint: 'Curling sprout branch',
        angle: 45
      }
    ]
  },
  {
    letter: 'S',
    lower: 's',
    word: 'Sun',
    emoji: '☀️',
    sound: 'sss',
    phonicsIntro: 'S says sss! S is for Sun!',
    color: '#FBBF24',
    bgGradient: 'from-amber-400 to-yellow-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 74 26 C 50 14 26 24 26 40 C 26 62 76 54 76 72 C 76 86 50 88 26 76',
        checkpoints: [{ x: 74, y: 26 }, { x: 50, y: 16 }, { x: 26, y: 35 }, { x: 50, y: 52 }, { x: 74, y: 68 }, { x: 50, y: 84 }, { x: 26, y: 76 }],
        startPoint: { x: 74, y: 26 },
        directionHint: 'Slither like a snake',
        angle: 180
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 68 46 C 52 38 36 44 36 54 C 36 68 66 62 66 74 C 66 82 48 84 34 76',
        checkpoints: [{ x: 68, y: 46 }, { x: 52, y: 40 }, { x: 36, y: 52 }, { x: 50, y: 62 }, { x: 66, y: 72 }, { x: 50, y: 80 }, { x: 34, y: 76 }],
        startPoint: { x: 68, y: 46 },
        directionHint: 'Little slither wave',
        angle: 180
      }
    ]
  },
  {
    letter: 'T',
    lower: 't',
    word: 'Tiger',
    emoji: '🐯',
    sound: 'tuh',
    phonicsIntro: 'T says tuh! T is for Tiger!',
    color: '#F97316',
    bgGradient: 'from-orange-500 to-red-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 20 18 L 80 18',
        checkpoints: [{ x: 20, y: 18 }, { x: 50, y: 18 }, { x: 80, y: 18 }],
        startPoint: { x: 20, y: 18 },
        directionHint: 'Top bar across',
        angle: 0
      },
      {
        id: 2,
        pathD: 'M 50 18 L 50 84',
        checkpoints: [{ x: 50, y: 18 }, { x: 50, y: 51 }, { x: 50, y: 84 }],
        startPoint: { x: 50, y: 18 },
        directionHint: 'Straight line down',
        angle: 90
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 48 24 L 48 76 C 48 84 56 86 64 82',
        checkpoints: [{ x: 48, y: 24 }, { x: 48, y: 50 }, { x: 48, y: 76 }, { x: 60, y: 83 }],
        startPoint: { x: 48, y: 24 },
        directionHint: 'Down and tiny turn',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 32 44 L 64 44',
        checkpoints: [{ x: 32, y: 44 }, { x: 48, y: 44 }, { x: 64, y: 44 }],
        startPoint: { x: 32, y: 44 },
        directionHint: 'Cross across',
        angle: 0
      }
    ]
  },
  {
    letter: 'U',
    lower: 'u',
    word: 'Umbrella',
    emoji: '☂️',
    sound: 'uh',
    phonicsIntro: 'U says uh! U is for Umbrella!',
    color: '#06B6D4',
    bgGradient: 'from-cyan-400 to-teal-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 26 18 L 26 62 C 26 84 74 84 74 62 L 74 18',
        checkpoints: [{ x: 26, y: 18 }, { x: 26, y: 50 }, { x: 38, y: 78 }, { x: 50, y: 84 }, { x: 62, y: 78 }, { x: 74, y: 50 }, { x: 74, y: 18 }],
        startPoint: { x: 26, y: 18 },
        directionHint: 'Slide down, swing up!',
        angle: 90
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 42 L 32 68 C 32 80 66 80 66 68 L 66 42',
        checkpoints: [{ x: 32, y: 42 }, { x: 32, y: 64 }, { x: 48, y: 78 }, { x: 66, y: 68 }, { x: 66, y: 42 }],
        startPoint: { x: 32, y: 42 },
        directionHint: 'Down and round up',
        angle: 90
      },
      {
        id: 2,
        pathD: 'M 66 42 L 66 78',
        checkpoints: [{ x: 66, y: 42 }, { x: 66, y: 60 }, { x: 66, y: 78 }],
        startPoint: { x: 66, y: 42 },
        directionHint: 'Straight tail down',
        angle: 90
      }
    ]
  },
  {
    letter: 'V',
    lower: 'v',
    word: 'Violin',
    emoji: '🎻',
    sound: 'vvv',
    phonicsIntro: 'V says vvv! V is for Violin!',
    color: '#8B5CF6',
    bgGradient: 'from-violet-400 to-purple-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 22 18 L 50 84',
        checkpoints: [{ x: 22, y: 18 }, { x: 36, y: 51 }, { x: 50, y: 84 }],
        startPoint: { x: 22, y: 18 },
        directionHint: 'Slant slide down',
        angle: 65
      },
      {
        id: 2,
        pathD: 'M 50 84 L 78 18',
        checkpoints: [{ x: 50, y: 84 }, { x: 64, y: 51 }, { x: 78, y: 18 }],
        startPoint: { x: 50, y: 84 },
        directionHint: 'Climb right up',
        angle: 295
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 30 42 L 50 80',
        checkpoints: [{ x: 30, y: 42 }, { x: 40, y: 61 }, { x: 50, y: 80 }],
        startPoint: { x: 30, y: 42 },
        directionHint: 'Slant down',
        angle: 65
      },
      {
        id: 2,
        pathD: 'M 50 80 L 70 42',
        checkpoints: [{ x: 50, y: 80 }, { x: 60, y: 61 }, { x: 70, y: 42 }],
        startPoint: { x: 50, y: 80 },
        directionHint: 'Climb up',
        angle: 295
      }
    ]
  },
  {
    letter: 'W',
    lower: 'w',
    word: 'Whale',
    emoji: '🐋',
    sound: 'wuh',
    phonicsIntro: 'W says wuh! W is for Whale!',
    color: '#3B82F6',
    bgGradient: 'from-blue-400 to-indigo-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 18 18 L 32 84',
        checkpoints: [{ x: 18, y: 18 }, { x: 25, y: 51 }, { x: 32, y: 84 }],
        startPoint: { x: 18, y: 18 },
        directionHint: 'Slide down valley 1',
        angle: 75
      },
      {
        id: 2,
        pathD: 'M 32 84 L 50 38',
        checkpoints: [{ x: 32, y: 84 }, { x: 41, y: 61 }, { x: 50, y: 38 }],
        startPoint: { x: 32, y: 84 },
        directionHint: 'Climb up to peak',
        angle: 290
      },
      {
        id: 3,
        pathD: 'M 50 38 L 68 84',
        checkpoints: [{ x: 50, y: 38 }, { x: 59, y: 61 }, { x: 68, y: 84 }],
        startPoint: { x: 50, y: 38 },
        directionHint: 'Slide down valley 2',
        angle: 70
      },
      {
        id: 4,
        pathD: 'M 68 84 L 82 18',
        checkpoints: [{ x: 68, y: 84 }, { x: 75, y: 51 }, { x: 82, y: 18 }],
        startPoint: { x: 68, y: 84 },
        directionHint: 'Climb up to end',
        angle: 285
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 22 42 L 34 80',
        checkpoints: [{ x: 22, y: 42 }, { x: 28, y: 61 }, { x: 34, y: 80 }],
        startPoint: { x: 22, y: 42 },
        directionHint: 'Down valley',
        angle: 75
      },
      {
        id: 2,
        pathD: 'M 34 80 L 50 54',
        checkpoints: [{ x: 34, y: 80 }, { x: 42, y: 67 }, { x: 50, y: 54 }],
        startPoint: { x: 34, y: 80 },
        directionHint: 'Up mountain',
        angle: 300
      },
      {
        id: 3,
        pathD: 'M 50 54 L 66 80',
        checkpoints: [{ x: 50, y: 54 }, { x: 58, y: 67 }, { x: 66, y: 80 }],
        startPoint: { x: 50, y: 54 },
        directionHint: 'Down wave',
        angle: 60
      },
      {
        id: 4,
        pathD: 'M 66 80 L 78 42',
        checkpoints: [{ x: 66, y: 80 }, { x: 72, y: 61 }, { x: 78, y: 42 }],
        startPoint: { x: 66, y: 80 },
        directionHint: 'Up to the sky',
        angle: 285
      }
    ]
  },
  {
    letter: 'X',
    lower: 'x',
    word: 'Xylophone',
    emoji: '🎵',
    sound: 'ks',
    phonicsIntro: 'X says ks! X is for Xylophone!',
    color: '#EC4899',
    bgGradient: 'from-pink-400 to-rose-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 25 18 L 75 84',
        checkpoints: [{ x: 25, y: 18 }, { x: 50, y: 51 }, { x: 75, y: 84 }],
        startPoint: { x: 25, y: 18 },
        directionHint: 'Slant slide right',
        angle: 50
      },
      {
        id: 2,
        pathD: 'M 75 18 L 25 84',
        checkpoints: [{ x: 75, y: 18 }, { x: 50, y: 51 }, { x: 25, y: 84 }],
        startPoint: { x: 75, y: 18 },
        directionHint: 'Cross right over left',
        angle: 130
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 42 L 68 80',
        checkpoints: [{ x: 32, y: 42 }, { x: 50, y: 61 }, { x: 68, y: 80 }],
        startPoint: { x: 32, y: 42 },
        directionHint: 'Slant slide',
        angle: 45
      },
      {
        id: 2,
        pathD: 'M 68 42 L 32 80',
        checkpoints: [{ x: 68, y: 42 }, { x: 50, y: 61 }, { x: 32, y: 80 }],
        startPoint: { x: 68, y: 42 },
        directionHint: 'Cross across',
        angle: 135
      }
    ]
  },
  {
    letter: 'Y',
    lower: 'y',
    word: 'Yak',
    emoji: '🐂',
    sound: 'yuh',
    phonicsIntro: 'Y says yuh! Y is for Yak!',
    color: '#10B981',
    bgGradient: 'from-emerald-400 to-teal-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 24 18 L 50 50',
        checkpoints: [{ x: 24, y: 18 }, { x: 37, y: 34 }, { x: 50, y: 50 }],
        startPoint: { x: 24, y: 18 },
        directionHint: 'Left arm in',
        angle: 50
      },
      {
        id: 2,
        pathD: 'M 76 18 L 50 50',
        checkpoints: [{ x: 76, y: 18 }, { x: 63, y: 34 }, { x: 50, y: 50 }],
        startPoint: { x: 76, y: 18 },
        directionHint: 'Right arm in',
        angle: 130
      },
      {
        id: 3,
        pathD: 'M 50 50 L 50 84',
        checkpoints: [{ x: 50, y: 50 }, { x: 50, y: 67 }, { x: 50, y: 84 }],
        startPoint: { x: 50, y: 50 },
        directionHint: 'Stem down to the ground',
        angle: 90
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 42 L 50 68',
        checkpoints: [{ x: 32, y: 42 }, { x: 41, y: 55 }, { x: 50, y: 68 }],
        startPoint: { x: 32, y: 42 },
        directionHint: 'Slant slide in',
        angle: 55
      },
      {
        id: 2,
        pathD: 'M 68 42 L 36 92',
        checkpoints: [{ x: 68, y: 42 }, { x: 52, y: 67 }, { x: 36, y: 92 }],
        startPoint: { x: 68, y: 42 },
        directionHint: 'Long slide deep below',
        angle: 125
      }
    ]
  },
  {
    letter: 'Z',
    lower: 'z',
    word: 'Zebra',
    emoji: '🦓',
    sound: 'zzz',
    phonicsIntro: 'Z says zzz! Z is for Zebra!',
    color: '#6366F1',
    bgGradient: 'from-indigo-400 to-purple-500',
    upperStrokes: [
      {
        id: 1,
        pathD: 'M 24 20 L 76 20',
        checkpoints: [{ x: 24, y: 20 }, { x: 50, y: 20 }, { x: 76, y: 20 }],
        startPoint: { x: 24, y: 20 },
        directionHint: 'Zip across top',
        angle: 0
      },
      {
        id: 2,
        pathD: 'M 76 20 L 24 82',
        checkpoints: [{ x: 76, y: 20 }, { x: 50, y: 51 }, { x: 24, y: 82 }],
        startPoint: { x: 76, y: 20 },
        directionHint: 'Zag slide down left',
        angle: 130
      },
      {
        id: 3,
        pathD: 'M 24 82 L 76 82',
        checkpoints: [{ x: 24, y: 82 }, { x: 50, y: 82 }, { x: 76, y: 82 }],
        startPoint: { x: 24, y: 82 },
        directionHint: 'Zip across bottom',
        angle: 0
      }
    ],
    lowerStrokes: [
      {
        id: 1,
        pathD: 'M 32 44 L 68 44',
        checkpoints: [{ x: 32, y: 44 }, { x: 50, y: 44 }, { x: 68, y: 44 }],
        startPoint: { x: 32, y: 44 },
        directionHint: 'Zip top',
        angle: 0
      },
      {
        id: 2,
        pathD: 'M 68 44 L 32 78',
        checkpoints: [{ x: 68, y: 44 }, { x: 50, y: 61 }, { x: 32, y: 78 }],
        startPoint: { x: 68, y: 44 },
        directionHint: 'Zag down',
        angle: 135
      },
      {
        id: 3,
        pathD: 'M 32 78 L 68 78',
        checkpoints: [{ x: 32, y: 78 }, { x: 50, y: 78 }, { x: 68, y: 78 }],
        startPoint: { x: 32, y: 78 },
        directionHint: 'Zip bottom',
        angle: 0
      }
    ]
  }
];
