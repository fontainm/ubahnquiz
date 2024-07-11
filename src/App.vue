<script setup>
import UndergroundMap from '@/components/UndergroundMap.vue'
</script>

<template>
  <main>
    <div class="header">
      <div class="timer">00:00</div>
      <div class="question">
        <span>Wo ist </span>
        <StationName v-if="questionedStation" :station="questionedStation" />?
      </div>
      <div class="progress">0%</div>
    </div>
    <Transition>
      <div
        v-show="hoveredStation"
        class="info"
        :style="`left: ${mousePosition.x}px; top: ${mousePosition.y}px`"
      >
        <StationName :station="hoveredStation" />
      </div>
    </Transition>
    <UndergroundMap @overStation="setHoveredStation" @leaveStation="setHoveredStation(null)" />
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #00000033;
  padding: 1rem;
  font-size: 2rem;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
