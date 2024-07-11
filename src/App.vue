<script setup>
import UndergroundMap from '@/components/UndergroundMap.vue'
import StationName from '@/components/StationName.vue'
import stations from './data/stations.json'
</script>

<template>
  <main>
    <div class="page">
      <div class="header">
        <div class="timer">00:00</div>
        <div class="question">
          <span>Wo ist </span>
          <StationName v-if="stationStore.question" :station="stationStore.question" />?
        </div>
        <div class="progress">{{ stationStore.progress }}</div>
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
      mousePosition: { x: 0, y: 0 }
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
      if (station.name == this.stationStore.question.name) {
        this.stationStore.setSolved(station)
        console.log('YES!')
      } else {
        console.log('NO!')
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
  border-bottom: 1px solid #00000033;
  padding: 1rem;
  font-size: 2rem;
  background: white;

  .question {
    display: flex;
    align-items: center;
    max-height: 2rem;
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
    flex-direction: column;
    flex-wrap: wrap;
    font-size: 1rem;
  }

  .timer,
  .progress {
    order: 1;
  }
}
</style>
