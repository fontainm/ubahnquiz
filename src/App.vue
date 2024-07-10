<script setup>
import UndergroundMap from '@/components/UndergroundMap.vue'
</script>

<template>
  <main>
    <div v-if="hoveredStation" class="info">
      <div class="lines">
        <img v-for="line in hoveredStation.lines" :key="line" :src="`${line}.svg`" class="line" />
      </div>
      <span>
        {{ hoveredStation.name }}
      </span>
    </div>
    <UndergroundMap @overStation="setHoveredStation" @leaveStation="setHoveredStation(null)" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      hoveredStation: null
    }
  },
  methods: {
    setHoveredStation(station) {
      this.hoveredStation = station
    }
  }
}
</script>

<style scoped>
.lines {
  margin-right: 0.5rem;
  line-height: 0;
}

.line {
  width: 50px;
}

.info {
  position: absolute;
  font-size: 2rem;
  display: flex;
  align-items: center;
}
</style>
