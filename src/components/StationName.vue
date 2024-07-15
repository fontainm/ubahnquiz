<template>
  <div v-if="station" class="stationname">
    <div class="lines">
      <img v-for="line in station.lines" :key="line" :src="`img/${line}.svg`" class="line" />
    </div>
    <span class="name">
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

<style scoped lang="scss">
.stationname {
  display: inline-flex;
  align-items: center;

  .lines {
    margin-right: 0.5rem;
    height: 2rem;
    white-space: nowrap;
  }

  .line {
    height: inherit;
  }

  .name {
  }
}
</style>
