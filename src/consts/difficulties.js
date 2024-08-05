export const difficulties = Object.freeze({
  EASY: {
    id: 'learn',
    level: 0,
    name: 'Lernmodus',
    text: 'Perfekt für das erstmalige Lernen',
    settings: {
      maxPoints: 0,
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
      maxPoints: 3,
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
    text: "Ohne Farbhilfe, dafür gibt's Extrapunkte",
    settings: {
      maxPoints: 5,
      showNames: false,
      showLines: false,
      showLineColor: false,
      showSolved: false
    }
  }
})
