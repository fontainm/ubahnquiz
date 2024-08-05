export const difficulties = Object.freeze({
  EASY: {
    id: 'learn',
    level: 0,
    name: 'Lernmodus',
    text: 'Perfekt für das erstmalige Lernen',
    settings: {
      pointFactor: 0,
      showScore: false,
      showNames: true,
      showLines: true,
      showLineColor: true,
      showSolved: true
    }
  },
  STANDARD: {
    id: 'standard',
    level: 1,
    name: 'Standard',
    text: 'Für die erste Herausforderung',
    settings: {
      pointFactor: 1,
      showScore: true,
      showNames: false,
      showLines: true,
      showLineColor: true,
      showSolved: true
    }
  },
  HARD: {
    id: 'hard',
    level: 2,
    name: 'Schwierig',
    text: "Ohne Farbhilfe, dafür gibt's doppelte Punkte",
    settings: {
      pointFactor: 2,
      showScore: true,
      showNames: false,
      showLines: false,
      showLineColor: false,
      showSolved: false
    }
  }
})
