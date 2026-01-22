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
