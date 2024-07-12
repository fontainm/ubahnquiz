<script setup>
import UndergroundMap from '@/components/UndergroundMap.vue'
import StationName from '@/components/StationName.vue'
import GameOverModal from '@/components/GameOverModal.vue'
import stations from '@/data/stations.json'
</script>

<template>
  <main>
    <div class="page">
      <div class="header">
        <div class="timer">{{ stationStore.timer.value }}</div>

        <div class="question">
          <span>Wo ist </span>
          <StationName v-if="stationStore.question" :station="stationStore.question" />?
        </div>

        <!-- <button @click="stationStore.endGame()">Finish</button> -->

        <div class="score">
          <span>
            {{ stationStore.score }}
          </span>
          <span class="points">Punkte</span>
        </div>
      </div>

      <div class="progress">
        <div :style="`width: ${stationStore.progress}%`"></div>
      </div>

      <div class="map">
        <UndergroundMap
          :stations="stationStore.allStations"
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
import { useStationStore } from '@/stores/stations'

export default {
  components: {
    StationName
  },

  data() {
    return {
      hoveredStation: null,
      mousePosition: { x: 0, y: 0 },
      tries: 0
    }
  },

  mounted() {
    this.stationStore.setStations(stations)
    this.stationStore.newQuestion()
  },

  computed: {
    stationStore: () => useStationStore()
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
      if (!this.stationStore.timer.interval) {
        this.stationStore.startTimer()
      }
      if (station.id == this.stationStore.question.id) {
        this.stationStore.setSolved(station, this.tries)
        this.stationStore.addScore(3 - this.tries)
        this.tries = 0
      } else {
        if (this.tries < 3) {
          this.tries++
        }
        if (this.tries === 3) {
          this.stationStore.setHint()
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
    text-align: right;

    .points {
      font-size: 1rem;
      margin-left: 0.5rem;
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

      .points {
        margin-left: 0.25rem;
        font-size: 1.25rem;
      }
    }

    .timer {
      left: 1rem;
    }
  }
}
</style>
