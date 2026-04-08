// Official Barovian names from Curse of Strahd

export const maleNames = [
  'Alek', 'Andrej', 'Anton', 'Balthazar', 'Bogan', 'Boris', 'Dargos', 'Darzin',
  'Dragomir', 'Emeric', 'Falkon', 'Frederich', 'Franz', 'Gargosh', 'Gorek',
  'Grygori', 'Hans', 'Harkus', 'Ivan', 'Jirko', 'Kobal', 'Korga', 'Krystofor',
  'Lazlo', 'Livius', 'Marek', 'Miroslav', 'Nikolaj', 'Nimir', 'Oleg', 'Radovan',
  'Radu', 'Seraz', 'Sergei', 'Stefan', 'Tural', 'Valentin', 'Vasily', 'Vladislav',
  'Waltar', 'Yesper', 'Zsolt'
];

export const femaleNames = [
  'Alana', 'Clavdia', 'Danya', 'Dezdrelda', 'Diavola', 'Dorina', 'Drasha',
  'Drilvia', 'Elisabeta', 'Fatima', 'Grilsha', 'Isabella', 'Ivana', 'Jarzinka',
  'Kala', 'Katerina', 'Kereza', 'Korina', 'Lavinia', 'Magda', 'Marta', 'Mathilda',
  'Minodora', 'Mirabel', 'Miruna', 'Nimira', 'Nyanka', 'Olivenka', 'Ruxandra',
  'Sorina', 'Tereska', 'Valentina', 'Vasha', 'Victoria', 'Wensencia', 'Zondra'
];

// Family names with masculine/feminine variants
// Format: [masculine, feminine] or [neutral] if no variant
export const familyNames = [
  ['Alastroi', 'Alastroi'],
  ['Antonovich', 'Antonova'],
  ['Barthos', 'Barthos'],
  ['Belasco', 'Belasco'],
  ['Cantemir', 'Cantemir'],
  ['Dargovich', 'Dargova'],
  ['Diavolov', 'Diavolov'],
  ['Diminski', 'Diminski'],
  ['Dilisnya', 'Dilisnya'],
  ['Drazkoi', 'Drazkoi'],
  ['Garvinski', 'Garvinski'],
  ['Grejenko', 'Grejenko'],
  ['Groza', 'Groza'],
  ['Grygorovich', 'Grygorova'],
  ['Ivanovich', 'Ivanova'],
  ['Janek', 'Janek'],
  ['Karushkin', 'Karushkin'],
  ['Konstantinovich', 'Konstantinova'],
  ['Krezkov', 'Krezkova'],
  ['Krykski', 'Krykski'],
  ['Lansten', 'Lansten'],
  ['Lazarescu', 'Lazarescu'],
  ['Lukresh', 'Lukresh'],
  ['Lipsiege', 'Lipsiege'],
  ['Martikov', 'Martikova'],
  ['Mironovich', 'Mironovna'],
  ['Moldovar', 'Moldovar'],
  ['Nikolovich', 'Nikolova'],
  ['Nimirovich', 'Nimirova'],
  ['Oronovich', 'Oronova'],
  ['Petrovich', 'Petrovna'],
  ['Polensky', 'Polensky'],
  ['Radovich', 'Radova'],
  ['Rilsky', 'Rilsky'],
  ['Stefanovich', 'Stefanova'],
  ['Strazni', 'Strazni'],
  ['Swilovich', 'Swilova'],
  ['Taltos', 'Taltos'],
  ['Targolov', 'Targolova'],
  ['Tyminski', 'Tyminski'],
  ['Ulbrek', 'Ulbrek'],
  ['Ulrich', 'Ulrich'],
  ['Vadu', 'Vadu'],
  ['Voltanescu', 'Voltanescu'],
  ['Zalenski', 'Zalenski'],
  ['Zalken', 'Zalken']
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateName(gender = 'male') {
  const firstName = gender === 'male' ? randomFrom(maleNames) : randomFrom(femaleNames);
  const familyEntry = randomFrom(familyNames);
  const familyName = gender === 'male' ? familyEntry[0] : familyEntry[1];

  return { firstName, familyName, fullName: `${firstName} ${familyName}`, gender };
}

// --- Generic NPC distinguishing features ---

export const generalFeatures = [
  'a long scar running from the left ear to the chin',
  'one eye milky white and blind from an old wound',
  'a gap between the two front teeth',
  'hands that tremble faintly even at rest',
  'a faded burn scar across the back of one hand',
  'grey at the temples despite looking otherwise young',
  'a silver tooth that catches lamplight when they smile',
  'a ring on nearly every finger',
  'perpetually muddy boots regardless of the season',
  'a deep ragged scar across the knuckles of the right hand',
  'mismatched eyes — one brown, one pale grey',
  'an old brand mark on the inside of the left wrist',
  'a crooked nose, broken more than once',
  'dark circles under the eyes, deep and permanent',
  'a missing tip of the right index finger',
  'a wine-red birthmark across the left side of the neck',
  'hair cut unevenly, likely by their own hand',
  'a prominent widow\'s peak and deep-set eyes',
  'a faded anchor tattoo on the forearm',
  'clothes meticulously patched but never quite clean',
  'a notch missing from the right ear',
  'a jaw set slightly to one side from an old break',
  'nails bitten down to nothing on every finger',
  'an old rope burn scar around both wrists',
  'deep pockmarks across both cheeks from a childhood illness',
  'a serpent tattoo winding up the left forearm, faded with age',
  'hair so pale it appears white despite their apparent age',
  'eyebrows heavy enough to make the face look perpetually stern',
  'an elaborate brass earring in the left ear only',
  'a small leather cord around the wrist hung with tiny carved beads'
];

export function generateGenericNpc(gender = 'male', recentFeatures = []) {
  const name = generateName(gender);
  const available = generalFeatures.filter(f => !recentFeatures.includes(f));
  const feature = randomFrom(available.length > 0 ? available : generalFeatures);
  return { ...name, identifyingFeature: feature };
}

// --- Special NPC generation ---

// Common D&D / non-Barovian names for vampire spawn (especially starred former adventurers)
const dndCommonMaleNames = [
  'Aldric', 'Brennan', 'Caden', 'Dorian', 'Edmund', 'Fabian', 'Gareth', 'Hadrian',
  'Ivar', 'Jasper', 'Kael', 'Leoric', 'Marcus', 'Nolan', 'Owen', 'Percival',
  'Roland', 'Sebastian', 'Tomas', 'Ulric', 'Victor', 'Willem', 'Zane', 'Aldous',
  'Brennus', 'Castor', 'Davan', 'Evander', 'Florian', 'Gideon', 'Harlan'
];

const dndCommonFemaleNames = [
  'Aria', 'Brenna', 'Celeste', 'Diana', 'Elena', 'Fiona', 'Greta', 'Helena',
  'Iris', 'Jade', 'Kira', 'Lyra', 'Mira', 'Nadia', 'Petra', 'Rosalind',
  'Sera', 'Talia', 'Vera', 'Wren', 'Yara', 'Zoe', 'Aelith', 'Briar',
  'Calla', 'Della', 'Erin', 'Faye', 'Gwynne', 'Halla'
];

// Gender-neutral family names (no -ovich/-ova Slavic variants)
const dndCommonFamilyNames = [
  'Ashford', 'Blackwood', 'Coldwater', 'Dawnridge', 'Everhart', 'Fairweather',
  'Goldmane', 'Harrowgate', 'Ironwood', 'Kingsley', 'Moorfield', 'Nighthollow',
  'Oakenheart', 'Ravenswood', 'Silverstone', 'Thornbury', 'Vanthorn', 'Westmark',
  'Crestfall', 'Dunmore', 'Embervale', 'Frostholm', 'Greymantle', 'Holloway',
  'Ivywood', 'Larkmoor', 'Pallwick', 'Stormhaven'
];

function generateCommonName(gender) {
  const firstName = gender === 'male' ? randomFrom(dndCommonMaleNames) : randomFrom(dndCommonFemaleNames);
  const familyName = randomFrom(dndCommonFamilyNames);
  return { firstName, familyName, fullName: `${firstName} ${familyName}`, gender };
}

function generateVampireSpawnName(gender, isFormerAdventurer) {
  // Starred (former adventurer) vampire spawn: always common D&D names
  if (isFormerAdventurer) return generateCommonName(gender);
  // Regular spawn: 50/50 Barovian vs common D&D
  return Math.random() < 0.5 ? generateName(gender) : generateCommonName(gender);
}

export const werewolfFeatures = [
  'a network of old claw scars across the forearms',
  'knuckles scarred and thickened from countless brawls',
  'eyes that catch lamplight with an unsettling animal gleam',
  'unusually pronounced canine teeth',
  'a faint, musky smell like wet fur',
  'a jaw that seems slightly too wide for the face',
  'short, coarse hair on the backs of the hands and fingers',
  'fingernails always broken and dark-edged, as if clawed through earth',
  'a deep bite scar on the back of the neck, half-hidden by the collar',
  'pupils that catch light strangely — almost reflective',
  'powerful, hunched shoulders that strain the seams of their clothing',
  'a notch taken out of the left ear, long healed',
  'a brand mark on the collarbone, partially burned away',
  'calloused bare feet visible below too-short trousers',
  'veins visible and darkened along the forearms',
  'a broad, flat nose with heavily flared nostrils',
  'a thick, corded neck that strains against any collar',
  'a heavy brow ridge that gives the face a permanent scowl',
  'unusually dense, wiry hair along the forearms and shins',
  'a cluster of small round scars on the upper arm — old silver burns',
  'dirt ground permanently into every crease of the knuckles',
  'a heavyset jaw with a slight underbite'
];

export const wereravenFeatures = [
  'bright, dark eyes that take in a room before landing on a person',
  'ink-stained fingers on the right hand, always',
  'a faded tattoo of a raven mid-flight on the inner wrist',
  'a worn leather satchel covered in small stitched repairs, always overfull',
  'a silver ring bearing a raven\'s feather engraving',
  'deep blue-black hair that shines iridescently in direct light',
  'a small silver flask worn at the hip, dented and old',
  'a coat with more pockets than seems necessary, every one bulging',
  'soft-soled leather shoes worn thin from long travel',
  'laugh lines cut deep around the eyes from years of smiling',
  'lips perpetually stained dark — berries, wine, or ink, hard to tell',
  'a faint smell of candle wax and old parchment',
  'dozens of tiny cuts across the fingers from years of handling paper and twine',
  'a lean, wiry build that speaks of someone who walks long distances',
  'a carefully mended cloak patched in several mismatched fabrics',
  'a small collection of feathers tucked into their hatband',
  'a well-worn map case or compass always hanging at the belt',
  'neatly trimmed nails except the right thumbnail, kept conspicuously long',
  'a face weathered by years outdoors in every season',
  'pockets that visibly clink with small collected trinkets and coins',
  'dark, steady eyes that rarely look surprised by anything',
  'a warm, expressive face with an open, easy smile'
];

export const vampireSpawnFeatures = [
  'hollow cheeks and sunken eyes with permanent dark circles',
  'skin cold to the touch and faintly waxy, like old tallow',
  'pupils that stay fully dilated regardless of the light',
  'a faint, sweet smell of decay beneath strong perfume',
  'dark veins visible as thin lines beneath pale, papery skin',
  'teeth slightly too long and too white, unnaturally even',
  'a shadow that seems a half-beat behind their movements',
  'nails smooth, bloodless, and immaculately kept',
  'a slow, deliberate blink — as though remembering how',
  'no visible breath even in cold air',
  'extremely long fingers, pale and graceful',
  'twin scar marks at the neck, partially hidden by a collar',
  'a waxen, almost porcelain quality to the complexion',
  'lips so pale they are nearly the same colour as the surrounding skin',
  'eyes rimmed with dark bruise-like discoloration',
  'hair perfectly flat and motionless regardless of wind',
  'a bluish tint to the lips and the beds of the fingernails',
  'an utterly rigid, formal posture that never loosens',
  'skin on the hands that is dry and papery to the point of flaking',
  'a complete absence of the small unconscious movements — fidgeting, shifting weight — that living people make',
  'a faint, persistent chill that seems to follow them indoors',
  'an almost total absence of colour in the cheeks and lips'
];

export const dnd5eClasses = [
  'Barbarian', 'Bard', 'Cleric', 'Druid',
  'Fighter', 'Monk', 'Paladin', 'Ranger',
  'Rogue', 'Sorcerer', 'Warlock', 'Wizard'
];

export const dnd5eRaces = [
  'Human', 'Elf', 'Dwarf', 'Halfling',
  'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'
];

export const specialNpcTypes = ['werewolf', 'wereraven', 'vampire spawn'];

const featurePoolByType = {
  'werewolf': werewolfFeatures,
  'wereraven': wereravenFeatures,
  'vampire spawn': vampireSpawnFeatures,
};

export function generateSpecialNpc(gender = 'male', npcType = 'werewolf', recentFeatures = []) {
  const isFormerAdventurer = Math.random() < 0.25;

  // Name source depends on type and adventurer status
  const name = npcType === 'vampire spawn'
    ? generateVampireSpawnName(gender, isFormerAdventurer)
    : generateName(gender);

  const pool = featurePoolByType[npcType];
  const available = pool.filter(f => !recentFeatures.includes(f));
  const feature = randomFrom(available.length > 0 ? available : pool);

  let npcClass, npcRace, description;

  description = feature;

  if (isFormerAdventurer) {
    npcClass = randomFrom(dnd5eClasses);
    npcRace = randomFrom(dnd5eRaces);
  }

  return {
    ...name,
    npcType,
    identifyingFeature: feature,
    isFormerAdventurer,
    npcClass: isFormerAdventurer ? npcClass : null,
    npcRace: isFormerAdventurer ? npcRace : null,
    description,
  };
}
