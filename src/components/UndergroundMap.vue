<template>
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 2300 1875"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xml:space="preserve"
    xmlns:serif="http://www.serif.com/"
    style="
      fill-rule: evenodd;
      clip-rule: evenodd;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 1.5;
    "
  >
    <g id="waters">
      <path
        v-for="water in waters"
        :key="water.id"
        :d="water.d"
        :stroke-width="water.width"
        stroke="#dbf2f3"
        fill="none"
      />
    </g>

    <g id="lines">
      <path
        v-for="line in lines"
        :key="line.id"
        :d="line.d"
        fill="none"
        :stroke="line.color"
        stroke-width="40"
      />
    </g>

    <g id="stations">
      <circle
        v-for="station in stations"
        :key="station.name"
        :cx="station.cx"
        :cy="station.cy"
        r="22"
        stroke="#000"
        stroke-width="2"
        @mouseover="$emit('overStation', station)"
        @mouseleave="$emit('leaveStation')"
      />
    </g>
  </svg>
</template>

<script>
import waters from '../data/waters.json'
import lines from '../data/lines.json'
import stations from '../data/stations.json'

export default {
  data() {
    return {
      waters,
      lines,
      stations
    }
  }
}
</script>

<style scoped>
circle {
  cursor: pointer;
  transition: all 0.3s ease;
  fill: white;
}

circle:hover {
  fill: grey;
}
</style>
