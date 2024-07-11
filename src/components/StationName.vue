<template>
  <div v-if="station" class="stationname">
    <div class="lines">
      <img v-for="line in station.lines" :key="line" :src="`${line}.svg`" class="line" />
    </div>
    <span>
      {{ station.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    station: {
      required: true
    }
  }
}
</script>

<style scoped>
.stationname {
  display: inline-flex;
  align-items: center;
  margin-left: 0.5rem;
}

.lines {
  margin-right: 0.5rem;
  height: 2rem;
}

.line {
  height: inherit;
}
</style>
