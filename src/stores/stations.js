import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStationStore = defineStore('question', {
  state: () => {
    return {
      question: null,
      stations: [],
      timer: {
        value: '00:00',
        start: 0,
        interval: null
      }
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

    startTimer() {
      this.timer.start = dayjs()
      this.timer.interval = setInterval(() => {
        this.timer.value = dayjs(dayjs() - this.timer.start).format('mm:ss')
      }, 1000)
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
        this.endGame()
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
    },

    endGame() {
      console.log('Game Over!')
      clearInterval(this.timer.interval)
    }
  }
})
