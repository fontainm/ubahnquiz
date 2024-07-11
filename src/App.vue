<script setup>
import UndergroundMap from '@/components/UndergroundMap.vue'
</script>

<template>
  <main>
    <div class="page">
      <div class="header">
        <div class="timer">00:00</div>
        <div class="question">
          <span>Wo ist </span>
          <StationName v-if="questionedStation" :station="questionedStation" />?
        </div>
        <div class="progress">0%</div>
      </div>

      <div class="map">
        <UndergroundMap @overStation="setHoveredStation" @leaveStation="setHoveredStation(null)" />
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
import stations from './data/stations.json'
import StationName from './components/StationName.vue'

export default {
  components: {
    StationName
  },

  data() {
    return {
      questionedStation: null,
      hoveredStation: null,
      mousePosition: { x: 0, y: 0 },
      stations
    }
  },

  mounted() {
    this.questionedStation = stations[Math.floor(Math.random() * stations.length)]
  },

  methods: {
    setHoveredStation(station, event) {
      this.hoveredStation = station
      if (event) {
        this.mousePosition = {
          x: event.pageX,
          y: event.pageY
        }
      }
    }
  }
}
</script>

<style scoped>
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
}

.map {
  height: 100%;
}

.question {
  display: flex;
  align-items: center;
  max-height: 2rem;
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
