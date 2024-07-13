<script setup>
import UndergroundMap from '@/components/UndergroundMap.vue'
import StationName from '@/components/StationName.vue'
import GameOverModal from '@/components/GameOverModal.vue'
import stations from '@/data/stations.json'
</script>

<template>
  <main>
    <div class="page">
      <div class="wrapper">
        <div class="header">
          <div class="timer">{{ mainStore.timer.value }}</div>

          <div class="question">
            <span>Wo ist </span>
            <StationName v-if="mainStore.question" :station="mainStore.question" />?
          </div>

          <div class="score">
            <span>
              {{ mainStore.score }}
            </span>
            <span class="score-text">Punkte</span>
            <span class="score-points" :class="{ show: pointAnimation }" :style="``"
              >+{{ points }}</span
            >
          </div>
        </div>

        <div class="progress">
          <div :style="`width: ${mainStore.progress}%`"></div>
        </div>
      </div>

      <div class="map">
        <UndergroundMap
          :stations="mainStore.allStations"
          @overStation="setHoveredStation"
          @leaveStation="hoveredStation = null"
          @clickStation="handleClickStation"
        />
      </div>
    </div>

    <div
      v-show="hoveredStation"
      class="info"
      :style="`left: ${mousePosition.x}px; top: ${mousePosition.y}px`"
    >
      <StationName :station="hoveredStation" />
    </div>

    <GameOverModal />
  </main>
</template>

<script>
import { useMainStore } from '@/stores/main'

export default {
  components: {
    StationName
  },

  data() {
    return {
      hoveredStation: null,
      mousePosition: { x: 0, y: 0 },
      points: 0,
      pointAnimation: false,
      tries: 0
    }
  },

  mounted() {
    this.mainStore.setStations(stations)
    this.mainStore.newQuestion()
  },

  computed: {
    mainStore: () => useMainStore()
  },

  methods: {
    setHoveredStation(station, event) {
      if (!station.solved) {
        return
      }
      this.hoveredStation = station
      if (event) {
        this.mousePosition = {
          x: event.pageX,
          y: event.pageY
        }
      }
    },

    handleClickStation(station) {
      if (!this.mainStore.timer.interval) {
        this.mainStore.startTimer()
      }
      if (station.id == this.mainStore.question.id) {
        this.mainStore.setSolved(station, this.tries)
        this.points = 3 - this.tries
        if (this.points > 0) {
          this.mainStore.addScore(this.points)
          this.pointAnimation = true
          setTimeout(() => {
            this.pointAnimation = false
          }, 2000)
        }
        this.tries = 0
      } else {
        this.mainStore.setWrong(station)
        if (this.tries < 3) {
          this.tries++
        }
        if (this.tries === 3) {
          this.mainStore.setHint()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.page {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.wrapper {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  background: white;

  .question {
    display: flex;
    align-items: center;
    max-height: 2rem;
    white-space: nowrap;
  }

  .timer,
  .score {
    width: 90px;
  }

  .score {
    position: relative;
    text-align: right;

    .score-text {
      font-size: 1rem;
      margin-left: 0.5rem;
    }

    .score-points {
      pointer-events: none;
      position: absolute;
      left: 0;
      top: 0;
      color: #50c878;
      opacity: 0;

      &.show {
        animation: 2s normal ease point-animation;
      }
    }
  }
}

.progress {
  background: #eee;
  height: 10px;

  & > div {
    transition: width 0.3s ease;
    height: 100%;
    background: #50c878;
  }
}

.map {
  height: 100%;
}

.info {
  pointer-events: none;
  position: absolute;
  font-size: 1.5rem;
  display: flex;
  padding-left: 1rem;
  align-items: center;
}

@media screen and (max-width: 767px) {
  .header {
    font-size: 1.5rem;

    .question {
      width: 100%;
      justify-content: center;
    }

    .score,
    .timer {
      font-size: 1.25rem;
      position: absolute;
      top: 5rem;
    }

    .score {
      right: 1rem;

      .score-text {
        margin-left: 0.25rem;
        font-size: 1.25rem;
      }

      .score-points {
        left: 5px;
      }
    }

    .timer {
      left: 1rem;
    }
  }
}

@keyframes point-animation {
  from {
    opacity: 1;
    top: 0;
  }

  to {
    opacity: 0;
    top: -50px;
  }
}
</style>
