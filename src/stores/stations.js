import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useStationStore = defineStore('question', {
  state: () => {
    return {
      question: null,
      stations: [],
      score: 0,
      timer: {
        value: '00:00',
        start: 0,
        interval: null
      },
      gameOver: false
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

    addScore(points) {
      this.score += points
    },

    newQuestion() {
      this.question =
        this.unsolvedStations[Math.floor(Math.random() * this.unsolvedStations.length)]
    },

    endGame() {
      this.gameOver = true
      clearInterval(this.timer.interval)
    },

    resetGame() {
      this.gameOver = false
      this.timer = {
        value: '00:00',
        start: 0,
        interval: null
      }
      this.stations.map((s) => {
        s.solved = false
        s.tries = 0
        s.hint = false
      })
      this.newQuestion()
      this.score = 0
    }
  }
})
