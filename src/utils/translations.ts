import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  startPlaying: string;
  chooseAge: string;
  parentArea: string;
  settings: string;
  language: string;
  backToWorldMap: string;
  replay: string;
  nextActivity: string;
  greatJob: string;
  wonderful: string;
  fantastic: string;
  tryAgain: string;
  youDidIt: string;
  starsEarned: string;
  soundOn: string;
  soundOff: string;
  musicOn: string;
  musicOff: string;
  ageGroups: {
    '0-1': { title: string; subtitle: string; desc: string };
    '1-2': { title: string; subtitle: string; desc: string };
    '2-3': { title: string; subtitle: string; desc: string };
    '3-4': { title: string; subtitle: string; desc: string };
    '4-5': { title: string; subtitle: string; desc: string };
  };
  worlds: {
    'abc-adventure': { title: string; desc: string };
    'number-kingdom': { title: string; desc: string };
    'animal-world': { title: string; desc: string };
    'colour-garden': { title: string; desc: string };
    'puzzle-planet': { title: string; desc: string };
    'creative-corner': { title: string; desc: string };
    'story-castle': { title: string; desc: string };
    'music-village': { title: string; desc: string };
    'everyday-heroes': { title: string; desc: string };
  };
  parent: {
    gateTitle: string;
    gatePrompt: string;
    gateInstruction: string;
    gateSubmit: string;
    dashboard: string;
    childrenProfiles: string;
    addChild: string;
    childName: string;
    selectAge: string;
    chooseAvatar: string;
    createProfile: string;
    learningProgress: string;
    starsCollected: string;
    timeSpent: string;
    activitiesDone: string;
    screenTimeLimit: string;
    minutes: string;
    unlimited: string;
    audioSettings: string;
    narration: string;
    soundEffects: string;
    backgroundMusic: string;
    reducedMotion: string;
    childSafetyTitle: string;
    childSafetyText: string;
    supabaseTitle: string;
    supabaseDesc: string;
    exportData: string;
    importData: string;
    close: string;
    breakTimeTitle: string;
    breakTimeDesc: string;
    breakTimeAction: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'Little Genius World',
    tagline: 'Little Minds. Big Discoveries!',
    startPlaying: 'Start Playing!',
    chooseAge: 'Choose Age',
    parentArea: 'Parents Area',
    settings: 'Settings',
    language: 'Language',
    backToWorldMap: 'World Map',
    replay: 'Play Again',
    nextActivity: 'Next Discovery!',
    greatJob: 'Great Job!',
    wonderful: 'Wonderful!',
    fantastic: 'Fantastic!',
    tryAgain: "Let's try again!",
    youDidIt: 'You Did It!',
    starsEarned: 'Stars Collected!',
    soundOn: 'Sound On',
    soundOff: 'Sound Off',
    musicOn: 'Music On',
    musicOff: 'Music Off',
    ageGroups: {
      '0-1': {
        title: 'Baby Explorer',
        subtitle: '0–1 Years',
        desc: 'Sensory bubbles, soft colors, peek-a-boo animal sounds & gentle parent-guided play.'
      },
      '1-2': {
        title: 'Little Discoverer',
        subtitle: '1–2 Years',
        desc: 'Animal sounds, first words, high contrast objects & color touches.'
      },
      '2-3': {
        title: 'Smart Learner',
        subtitle: '2–3 Years',
        desc: 'Counting to 5, basic shapes, color matching & simple friendly puzzles.'
      },
      '3-4': {
        title: 'Clever Kids',
        subtitle: '3–4 Years',
        desc: 'Alphabet A–Z phonics, counting to 10, memory cards & sorting games.'
      },
      '4-5': {
        title: 'Little Champions',
        subtitle: '4–5 Years',
        desc: 'Early reading, fun addition, spelling challenges & pattern logic.'
      }
    },
    worlds: {
      'abc-adventure': {
        title: 'ABC Adventure',
        desc: 'Explore letters A to Z, phonics sounds, and build fun words!'
      },
      'number-kingdom': {
        title: 'Number Kingdom',
        desc: 'Count magical stars, solve simple math, and discover numbers 1–20!'
      },
      'animal-world': {
        title: 'Animal World',
        desc: 'Meet friendly farm, wild, sea animals and listen to their cute sounds!'
      },
      'colour-garden': {
        title: 'Colour Garden',
        desc: 'Pick bright colors, match magical shapes, and sort sweet flowers!'
      },
      'puzzle-planet': {
        title: 'Puzzle Planet',
        desc: 'Solve picture jigsaws, memory match cards, and find missing pieces!'
      },
      'creative-corner': {
        title: 'Creative Corner',
        desc: 'Paint colorful drawings, color cute mascots, and save your masterpieces!'
      },
      'story-castle': {
        title: 'Story Castle',
        desc: 'Listen to narrated bedtime stories with kind morals and gentle pictures!'
      },
      'music-village': {
        title: 'Music Village',
        desc: 'Play the rainbow xylophone, sing nursery songs, and tap the drums!'
      },
      'everyday-heroes': {
        title: 'Everyday Heroes',
        desc: 'Wash away germs, brush teeth, learn healthy foods and road safety!'
      }
    },
    parent: {
      gateTitle: 'Parental Verification',
      gatePrompt: 'Grown-ups only: Please answer this question to proceed:',
      gateInstruction: 'Type the correct answer number',
      gateSubmit: 'Verify & Enter',
      dashboard: 'Parent & Educator Dashboard',
      childrenProfiles: 'Child Profiles',
      addChild: '+ Add Child Profile',
      childName: "Child's Name",
      selectAge: 'Age Group',
      chooseAvatar: 'Choose Mascot Avatar',
      createProfile: 'Save Profile',
      learningProgress: 'Learning Milestones & Progress',
      starsCollected: 'Total Stars Collected',
      timeSpent: 'Total Play Time',
      activitiesDone: 'Activities Mastered',
      screenTimeLimit: 'Daily Screen-Time Limit',
      minutes: 'minutes',
      unlimited: 'No Limit',
      audioSettings: 'Sound & Audio Controls',
      narration: 'Voice Narration',
      soundEffects: 'Sound Effects Volume',
      backgroundMusic: 'Playful Background Music',
      reducedMotion: 'Sensory Comfort (Reduced Motion)',
      childSafetyTitle: '100% Child Safety & Privacy Commitment',
      childSafetyText: 'Little Genius World contains zero advertisements, zero public chat, zero behavioral tracking, and collects no photos or voice recordings. Compliant with COPPA and global child protection standards.',
      supabaseTitle: 'Supabase Cloud Synchronization',
      supabaseDesc: 'Optionally link your Supabase database to synchronize child milestones and learning history across home tablets and devices.',
      exportData: 'Export Progress (JSON)',
      importData: 'Import Progress (JSON)',
      close: 'Back to Game',
      breakTimeTitle: 'Time for a Happy Stretch!',
      breakTimeDesc: "You have enjoyed great learning fun today! Let's rest your eyes, drink some water, and stretch your body.",
      breakTimeAction: 'Unlock with Parent Gate'
    }
  },
  yo: {
    appName: 'Aye Ọmọ Ọlọgbọn',
    tagline: 'Ọkàn Kekere. Awari Nla!',
    startPlaying: 'Bẹrẹ Ere!',
    chooseAge: 'Yan Ọjọ-ori',
    parentArea: 'Agbegbe Awọn Obi',
    settings: 'Eto',
    language: 'Ede',
    backToWorldMap: 'Maapu Aye',
    replay: 'Tun Gbiyanju',
    nextActivity: 'Awari To Kan!',
    greatJob: 'Iṣẹ Daadaa!',
    wonderful: 'O Yanilenu!',
    fantastic: 'O Tayọ!',
    tryAgain: 'Jẹ ki a tun gbiyanju!',
    youDidIt: 'O Ṣe E!',
    starsEarned: 'Irawọ Ti O Gba!',
    soundOn: 'Ohun Titan',
    soundOff: 'Ohun Pipa',
    musicOn: 'Orin Titan',
    musicOff: 'Orin Pipa',
    ageGroups: {
      '0-1': {
        title: 'Oníròrò Ọmọ',
        subtitle: 'Ọdun 0–1',
        desc: 'Awọn nyoju ifarako, awọn awọ rirọ, ati awọn ohun ẹranko onirẹlẹ.'
      },
      '1-2': {
        title: 'Awaari Kekere',
        subtitle: 'Ọdun 1–2',
        desc: 'Awọn ohun ẹranko, awọn ọrọ akọkọ, ati awọn awọ ipilẹ.'
      },
      '2-3': {
        title: 'Ọmọ Akẹkọọ Ọlọgbọn',
        subtitle: 'Ọdun 2–3',
        desc: 'Kika to 5, awọn apẹrẹ, ibaramu awọ ati awọn ere adojuru ti o rọrun.'
      },
      '3-4': {
        title: 'Awọn Ọmọ Ọlọgbọn',
        subtitle: 'Ọdun 3–4',
        desc: 'A-B-D lẹta, kika to 10, awọn kaadi iranti ati tito lẹsẹsẹ.'
      },
      '4-5': {
        title: 'Awọn Aṣaju Kekere',
        subtitle: 'Ọdun 4–5',
        desc: 'Kika ibẹrẹ, afikun irọrun, ati awọn apẹẹrẹ oye.'
      }
    },
    worlds: {
      'abc-adventure': {
        title: 'Irin-ajo ABD',
        desc: 'Kọ ẹkọ awọn lẹta A de Z, awọn ohun lẹta ati kọ awọn ọrọ igbadun!'
      },
      'number-kingdom': {
        title: 'Ijọba Nọmba',
        desc: 'Ka awọn irawọ idan, kọ iṣiro rọrun, ki o ṣe awari 1–20!'
      },
      'animal-world': {
        title: 'Aye Eranko',
        desc: 'Pade awọn ẹranko oko, igbó ati okun ki o tẹtisi awọn ohun wọn!'
      },
      'colour-garden': {
        title: 'Ọgba Awọ',
        desc: 'Yan awọn awọ didan, baamu awọn apẹrẹ idan ki o to awọn ododo!'
      },
      'puzzle-planet': {
        title: 'Aye Adojuru',
        desc: 'Yanju awọn aworan adojuru ati awọn kaadi iranti!'
      },
      'creative-corner': {
        title: 'Igun Ṣiṣẹda',
        desc: 'Fa awọn aworan awọ, ṣe ọṣọ ki o fipamọ iṣẹ ọna rẹ!'
      },
      'story-castle': {
        title: 'Ile nla Itan',
        desc: 'Gbọ awọn itan ọmọde pẹlu awọn ẹkọ iwa rere ati awọn aworan lẹwa!'
      },
      'music-village': {
        title: 'Abule Orin',
        desc: 'Mu ohun elo orin silofoonu, kọ orin ọmọde, ki o lu ilu!'
      },
      'everyday-heroes': {
        title: 'Awọn Akoni Ojoojumọ',
        desc: 'Fọ ọwọ rẹ, fọ ehin, kọ ẹkọ ounjẹ to dara ati aabo opopona!'
      }
    },
    parent: {
      gateTitle: 'Idaniloju Awọn Obi',
      gatePrompt: 'Fun awọn agbalagba nikan: Jọwọ dahun ibeere yii:',
      gateInstruction: 'Tẹ idahun ti o tọ si ibi',
      gateSubmit: 'Wọle si Ibi Iṣakoso',
      dashboard: 'Aaye Iṣakoso Obi',
      childrenProfiles: 'Profaili Awọn Ọmọde',
      addChild: '+ Fi Ọmọ Kún',
      childName: 'Orukọ Ọmọ',
      selectAge: 'Ẹgbẹ Ọjọ-ori',
      chooseAvatar: 'Yan Aworan Mascot',
      createProfile: 'Fipamọ Profaili',
      learningProgress: 'Ilọsiwaju Ẹkọ',
      starsCollected: 'Gbogbo Irawọ',
      timeSpent: 'Akoko Ti O Lo',
      activitiesDone: 'Awọn Iṣẹ Ti O Pari',
      screenTimeLimit: 'Idiwọn Akoko Iboju Ojoojumọ',
      minutes: 'iṣẹju',
      unlimited: 'Ko si Idiwọn',
      audioSettings: 'Eto Ohun ati Orin',
      narration: 'Kika Ohun',
      soundEffects: 'Agbara Ohun Ere',
      backgroundMusic: 'Orin Idanlẹkun',
      reducedMotion: 'Itunu Oju (Dinku Iṣipopada)',
      childSafetyTitle: 'Aabo ati Aṣiri Ọmọ 100%',
      childSafetyText: 'Aye Ọmọ Ọlọgbọn ko ni awọn ipolowo, ko si ibaraẹnisọrọ gbangba, ati pe ko gba fọto tabi ohun silẹ.',
      supabaseTitle: 'Supabase Cloud Asopọ',
      supabaseDesc: 'Sopọ pẹlu Supabase lati tọju ilọsiwaju ọmọ kọja awọn ẹrọ.',
      exportData: 'Gbe Data Jade (JSON)',
      importData: 'Mu Data Wọle (JSON)',
      close: 'Pada si Ere',
      breakTimeTitle: 'Akoko Fun Isinmi!',
      breakTimeDesc: 'O ti kọ ẹkọ pupọ loni! Sinmi oju rẹ ki o mu omi diẹ.',
      breakTimeAction: 'Ṣii pẹlu Obi'
    }
  },
  ha: {
    appName: 'Duniyar Ƙananan Masu Basira',
    tagline: 'Kananan Tunani. Manyan Bincike!',
    startPlaying: 'Fara Wasa!',
    chooseAge: 'Zaɓi Shekaru',
    parentArea: 'Wurin Iyaye',
    settings: 'Saituna',
    language: 'Harshe',
    backToWorldMap: 'Taswirar Duniya',
    replay: 'Sake Wasa',
    nextActivity: 'Bincike Na Gaba!',
    greatJob: 'Aiki Mai Kyau!',
    wonderful: 'Abin Mamaki!',
    fantastic: 'Mai Kyau Kwarai!',
    tryAgain: 'Bari mu sake gwadawa!',
    youDidIt: 'Ka Yi Nasara!',
    starsEarned: 'Taurari Masu Kyau!',
    soundOn: 'Sauti A Kunne',
    soundOff: 'Kashe Sauti',
    musicOn: 'Waka A Kunne',
    musicOff: 'Kashe Waka',
    ageGroups: {
      '0-1': {
        title: 'Mai Bincike Jariri',
        subtitle: 'Shekaru 0–1',
        desc: 'Kumburin ji, launuka masu laushi, da sautin dabbobi masu taushi.'
      },
      '1-2': {
        title: 'Karamin Mai Bincike',
        subtitle: 'Shekaru 1–2',
        desc: 'Sautin dabbobi, kalmomi na farko, da launuka masu sauki.'
      },
      '2-3': {
        title: 'Mai Koyo Mai Basira',
        subtitle: 'Shekaru 2–3',
        desc: 'Kidaya zuwa 5, sifofi, daidaita launuka da wasanin kwakwalwa.'
      },
      '3-4': {
        title: 'Yara Masu Hikima',
        subtitle: 'Shekaru 3–4',
        desc: 'Haruffa A–Z, kidaya zuwa 10, katinan tunani da rarrabawa.'
      },
      '4-5': {
        title: 'Kananan Zakaru',
        subtitle: 'Shekaru 4–5',
        desc: 'Karatun farko, lissafin sauki, da dabarun tunani.'
      }
    },
    worlds: {
      'abc-adventure': {
        title: 'Balaguron Haruffa',
        desc: 'Koyi haruffa A zuwa Z, sautin haruffa da kalmomi masu kayatarwa!'
      },
      'number-kingdom': {
        title: 'Mulkin Lambobi',
        desc: 'Kidaya taurari, koyi lissafi mai sauki, da lambobi 1–20!'
      },
      'animal-world': {
        title: 'Duniyar Dabbobi',
        desc: 'Sadu da dabbobin gida, daji da na ruwa kuma ka saurari sautinsu!'
      },
      'colour-garden': {
        title: 'Lambun Launuka',
        desc: 'Zabi launuka masu haske, daidaita sifofi da rarraba furanni!'
      },
      'puzzle-planet': {
        title: 'Duniyar Wasan Kwakwalwa',
        desc: 'Warware hotuna da katinan tunani masu sauki!'
      },
      'creative-corner': {
        title: 'Kusurwar Kirkira',
        desc: 'Zana hotuna masu launi, yi fenti ka ajiye aikinka!'
      },
      'story-castle': {
        title: 'Gidan Labari',
        desc: 'Saurari labaran yara masu dauke da darussa masu kyau da hotuna!'
      },
      'music-village': {
        title: 'Kauyen Kida',
        desc: 'Kada kida mai launuka, rera wakokin yara, kuma doke ganga!'
      },
      'everyday-heroes': {
        title: 'Jarumai Na Kullum',
        desc: 'Wanke hannaye, goge hakora, koyi abinci mai lafiya da kiyayewar hanya!'
      }
    },
    parent: {
      gateTitle: 'Tabbacin Iyaye',
      gatePrompt: 'Ga manya kawai: Da fatan za a amsa wannan tambaya:',
      gateInstruction: 'Rubuta amsa daidai anan',
      gateSubmit: 'Tabbatar & Shiga',
      dashboard: 'Dandalin Kula da Iyaye',
      childrenProfiles: 'Bayanin Yara',
      addChild: '+ Kara Bayanin Yaro',
      childName: 'Sunan Yaro',
      selectAge: 'Rukunin Shekaru',
      chooseAvatar: 'Zaɓi Hoton Mascot',
      createProfile: 'Ajiye Bayani',
      learningProgress: 'Cigaban Koyo',
      starsCollected: 'Jimillar Taurari',
      timeSpent: 'Lokacin Da Aka Yi',
      activitiesDone: 'Ayyukan Da Aka Kammala',
      screenTimeLimit: 'Iyakance Lokacin Allon Kullum',
      minutes: 'minti',
      unlimited: 'Babu Iyaka',
      audioSettings: 'Saitunan Sauti da Kida',
      narration: 'Karatun Sauti',
      soundEffects: 'Ƙarar Sautin Wasa',
      backgroundMusic: 'Wakar Baya',
      reducedMotion: 'Sauki Ga Idanu (Rage Motsi)',
      childSafetyTitle: '100% Tsaron Yaro da Sirri',
      childSafetyText: 'Duniyar Ƙananan Masu Basira ba ta da tallace-tallace, babu hira ta jama’a, kuma ba ta daukar hotuna ko muryoyi.',
      supabaseTitle: 'Haɗin Supabase na Cloud',
      supabaseDesc: 'Haɗa da Supabase domin adana cigaban koyon yaro a kowace na’ura.',
      exportData: 'Fitar da Bayanai (JSON)',
      importData: 'Shigar da Bayanai (JSON)',
      close: 'Koma Wasa',
      breakTimeTitle: 'Lokacin Hutu!',
      breakTimeDesc: 'Ka yi aiki sosai a yau! Huta idanunka ka sha ruwa kadan.',
      breakTimeAction: 'Bude Tare da Iyaye'
    }
  },
  ig: {
    appName: 'Ụwa Obere Ndị Nwere Ọgụgụ Isi',
    tagline: 'Echiche Nta. Nchọpụta Ukwu!',
    startPlaying: 'Malite Egwuregwu!',
    chooseAge: 'Họrọ Afọ',
    parentArea: 'Ebe Nne na Nna',
    settings: 'Ntọala',
    language: 'Asụsụ',
    backToWorldMap: 'Maapụ Ụwa',
    replay: 'Kpọọ Ọzọ',
    nextActivity: 'Nchọpụta Ọzọ!',
    greatJob: 'Ezigbo Ọrụ!',
    wonderful: 'Ọ Mara Mma nke Ukwuu!',
    fantastic: 'Ọ Magburu Onwe Ya!',
    tryAgain: 'Ka anyị nwaa ọzọ!',
    youDidIt: 'I Mere Ya!',
    starsEarned: 'Kpakpando Anakọtara!',
    soundOn: 'Uda Na-arụ Ọrụ',
    soundOff: 'Gbanyụọ Uda',
    musicOn: 'Egwu Na-arụ Ọrụ',
    musicOff: 'Gbanyụọ Egwu',
    ageGroups: {
      '0-1': {
        title: 'Nwa Nchọpụta',
        subtitle: 'Afọ 0–1',
        desc: 'Afụfụ mmetụta, agba dị nro, na ụda ụmụ anụmanụ dị jụụ.'
      },
      '1-2': {
        title: 'Obere Onye Nchọpụta',
        subtitle: 'Afọ 1–2',
        desc: 'Ụda anụmanụ, okwu mbụ, na agba dị mfe.'
      },
      '2-3': {
        title: 'Onye Mmụta Nwere Ọgụgụ Isi',
        subtitle: 'Afọ 2–3',
        desc: 'Ịgụta ruo 5, ọdịdị, na dakọtara agba na mgbagwoju anya dị mfe.'
      },
      '3-4': {
        title: 'Ụmụaka Nwere Amamihe',
        subtitle: 'Afọ 3–4',
        desc: 'Mkpụrụedemede A–Z, ịgụta ruo 10, kaadị ebe nchekwa na nhazi.'
      },
      '4-5': {
        title: 'Obere Ndị Mmeri',
        subtitle: 'Afọ 4–5',
        desc: 'Ọgụgụ mbụ, mgbakwunye dị mfe, na ezi uche.'
      }
    },
    worlds: {
      'abc-adventure': {
        title: 'Njem Mkpụrụedemede',
        desc: 'Mụta mkpụrụedemede A ruo Z, ụda ha na wulite okwu ọchị!'
      },
      'number-kingdom': {
        title: 'Alaeze Nọmba',
        desc: 'Gụọ kpakpando anwansi, dozie mgbakọ na mwepụ dị mfe, ma mụta 1–20!'
      },
      'animal-world': {
        title: 'Ụwa Anụmanụ',
        desc: 'Zute ụmụ anụmanụ nke ụlọ, ọhịa na osimiri ma gee ntị na ụda ha!'
      },
      'colour-garden': {
        title: 'Ubi Agba',
        desc: 'Họrọ agba na-egbuke egbuke, kwekọọ ọdịdị ma hazie ifuru mara mma!'
      },
      'puzzle-planet': {
        title: 'Ụwa Mgbagwoju Anya',
        desc: 'Dozie foto mgbagwoju anya na kaadị ncheta dị mfe!'
      },
      'creative-corner': {
        title: 'Nkuku Ịmepụta Ihe',
        desc: 'Tee foto mara mma, nye agba ma chekwaa ọrụ nka gị!'
      },
      'story-castle': {
        title: 'Ụlọ Akụkọ',
        desc: 'Gee ntị na akụkọ ụmụaka nwere ezi nkuzi na foto mara mma!'
      },
      'music-village': {
        title: 'Obodo Egwu',
        desc: 'Kụọ ngwá egwu nwere agba, bụọ abụ ụmụaka, kụọ ịgbà!'
      },
      'everyday-heroes': {
        title: 'Ndị dike nke Ụbọchị Niile',
        desc: 'Saa aka gị, hichaa ezé, mụta nri dị mma na nchekwa okporo ụzọ!'
      }
    },
    parent: {
      gateTitle: 'Nkwenye Nne na Nna',
      gatePrompt: 'Maka ndị okenye naanị: Biko zaa ajụjụ a:',
      gateInstruction: 'Pịnye azịza ziri ezi ebe a',
      gateSubmit: 'Kwenye & Banye',
      dashboard: 'Dashboard Nne na Nna',
      childrenProfiles: 'Profaịlụ Ụmụaka',
      addChild: '+ Tinye Profaịlụ Nwa',
      childName: 'Aha Nwa',
      selectAge: 'Otu Afọ',
      chooseAvatar: 'Họrọ Ihu Mascot',
      createProfile: 'Chekwaa Profaịlụ',
      learningProgress: 'Ọganihu Ọmụmụ',
      starsCollected: 'Ngụkọta Kpakpando',
      timeSpent: 'Oge Ejiri Gwuo',
      activitiesDone: 'Ihe Omume Agwụchara',
      screenTimeLimit: 'Oke Oge Ihuenyo Kwa Ụbọchị',
      minutes: 'nkeji',
      unlimited: 'Enweghị Oke',
      audioSettings: 'Ntọala Uda na Egwu',
      narration: 'Ọgụgụ Olu',
      soundEffects: 'Uda Egwuregwu',
      backgroundMusic: 'Egwu Nke Azụ',
      reducedMotion: 'Nkasi Obi Anya (Belata Mmegharị)',
      childSafetyTitle: '100% Nchedo Nwa na Nzuzo',
      childSafetyText: 'Ụwa Obere Ndị Nwere Ọgụgụ Isi enweghị mgbasa ozi ọ bụla, enweghị nkata ọha, anaghị anata foto ma ọ bụ olu.',
      supabaseTitle: 'Mmekọrịta Supabase Cloud',
      supabaseDesc: 'Jikọọ na Supabase iji chekwaa ọganihu nwa gị n’ofe ngwaọrụ niile.',
      exportData: 'Mbupụ Data (JSON)',
      importData: 'Bubata Data (JSON)',
      close: 'Laghachi na Egwuregwu',
      breakTimeTitle: 'Oge Maka Izu Ike!',
      breakTimeDesc: 'Ị mụtala ọtụtụ ihe taa! Zuo ike n’anya gị ma ṅụọ mmiri.',
      breakTimeAction: 'Mepee ya na Nne na Nna'
    }
  }
};
