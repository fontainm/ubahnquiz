import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { difficulties } from '@/consts/difficulties'

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      question: null,
      lastQuestion: null,
      stations: [],
      score: 0,
      timer: {
        value: '00:00',
        start: 0,
        interval: null
      },
      selectedDifficulty: difficulties.STANDARD,
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
      newStations[solvedStation].correct = true
      newStations[solvedStation].tries = tries
      newStations[solvedStation].hint = false
      this.setStations(newStations)
      setTimeout(() => {
        newStations[solvedStation].correct = false
      }, 500)
      if (this.unsolvedStations.length > 0) {
        this.newQuestion()
      } else {
        this.endGame()
      }
    },

    setWrong(station) {
      const wrongStation = this.stations.findIndex((s) => s.id == station.id)
      let newStations = this.stations
      newStations[wrongStation].wrong = true
      this.setStations(newStations)
      setTimeout(() => {
        newStations[wrongStation].wrong = false
        this.setStations(newStations)
      }, 500)
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
      this.lastQuestion = this.question
      this.question =
        this.unsolvedStations[Math.floor(Math.random() * this.unsolvedStations.length)]
    },

    endGame() {
      this.setGameOver(true)
      this.question = null
      clearInterval(this.timer.interval)
    },

    setGameOver(gameOver) {
      this.gameOver = gameOver
    },

    resetGame() {
      clearInterval(this.timer.interval)
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
      this.setGameOver(false)
    }
  }
})
