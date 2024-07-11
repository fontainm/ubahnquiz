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
      return ((this.solvedStations.length / this.allStations.length) * 100).toFixed(0) + '%'
    }
  },

  actions: {
    setStations(stations) {
      this.stations = stations
    },

    setSolved(station) {
      const solvedStation = this.stations.findIndex((s) => s.name == station.name)
      let newStations = this.stations
      newStations[solvedStation].solved = true
      this.setStations(newStations)
      if (this.unsolvedStations.length > 0) {
        this.newQuestion()
      } else {
        console.log('Game Over!')
      }
    },

    newQuestion() {
      this.question =
        this.unsolvedStations[Math.floor(Math.random() * this.unsolvedStations.length)]
    }
  }
})
