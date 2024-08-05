<template>
  <div v-if="station" class="stationname">
    <div v-if="showLines" class="lines">
      <img v-for="line in station.lines" :key="line" :src="`img/${line}.svg`" class="line" />
    </div>
    <span class="name" translate="no">
      {{ station.name }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    station: {
      required: true
    },
    showLines: {
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
.stationname {
  display: inline-flex;
  align-items: center;

  .lines {
    margin-right: 8px;
    height: 32px;
    white-space: nowrap;
  }

  .line {
    height: inherit;
  }
}
</style>
