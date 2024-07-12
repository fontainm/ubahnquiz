import { defineStore } from 'pinia'

export const useStationStore = defineStore('question', {
  state: () => {
    return {
      question: null,
      stations: []
    }
  },

  getters: {
    allStations(state) {
      return state.stations
    },

    solvedStations(state) {
      return state.stations.filter((s) => s.solved)
    },

    unsolvedStations(state) {
      return state.stations.filter((s) => !s.solved)
    },

    progress() {
      return ((this.solvedStations.length / this.allStations.length) * 100).toFixed(1)
    }
  },

  actions: {
    setStations(stations) {
      this.stations = stations
    },

    setSolved(station, tries) {
      const solvedStation = this.stations.findIndex((s) => s.id == station.id)
      let newStations = this.stations
      newStations[solvedStation].solved = true
      newStations[solvedStation].tries = tries
      newStations[solvedStation].hint = false
      this.setStations(newStations)
      if (this.unsolvedStations.length > 0) {
        this.newQuestion()
      } else {
        console.log('Game Over!')
      }
    },

    setHint() {
      const questionedStation = this.stations.findIndex((s) => s.id == this.question.id)
      let newStations = this.stations
      newStations[questionedStation].hint = true
      this.setStations(newStations)
    },

    newQuestion() {
      this.question =
        this.unsolvedStations[Math.floor(Math.random() * this.unsolvedStations.length)]
    }
  }
})
