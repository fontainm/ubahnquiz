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
    @touchstart="$emit('leaveStation')"
  >
    <g id="underground">
      <g id="waters">
        <path
          v-for="water in waters"
          :key="water.id"
          class="water"
          :d="water.d"
          :stroke-width="water.width"
          fill="none"
        />
      </g>

      <g id="lines">
        <path
          v-for="line in lines"
          :key="line.id"
          :d="line.d"
          class="line"
          :class="{ 'no-color': !showColors }"
          fill="none"
          :stroke="line.color"
          stroke-width="40"
        />
      </g>

      <g id="stations">
        <circle
          v-for="station in stations"
          :key="station.id"
          :cx="station.cx"
          :cy="station.cy"
          :class="[
            'station',
            {
              solved: station.solved && showSolved,
              hint: station.hint && !showInitialHint,
              correct: station.correct,
              wrong: station.wrong
            }
          ]"
          r="22"
          stroke-width="2"
          @mouseover="showSolved ? $emit('overStation', station, $event) : null"
          @mouseleave="$emit('leaveStation')"
          @click="handleClickStation(station, $event)"
          @touchend="handleClickStation(station, $event)"
        />

        <circle
          v-if="mainStore.question?.hint"
          class="hint-station"
          r="22"
          :cx="mainStore.question.cx"
          :cy="mainStore.question.cy"
        />
      </g>
    </g>
  </svg>
</template>

<script>
import waters from '../data/waters.json'
import lines from '../data/lines.json'
import panzoom from 'panzoom'
import { useMainStore } from '@/stores/main'

export default {
  props: {
    stations: {
      required: true
    },
    showColors: {
      default: true
    },
    showSolved: {
      default: true
    },
    showInitialHint: {
      default: false
    }
  },

  data() {
    return {
      waters,
      lines
    }
  },

  computed: {
    mainStore: () => useMainStore()
  },

  mounted() {
    let element = document.getElementById('underground')
    panzoom(element, {
      minZoom: 0.2,
      maxZoom: 2,
      bounds: true,
      boundsPadding: 0.5,
      zoomDoubleClickSpeed: 1
    })
  },

  methods: {
    handleClickStation(station, event) {
      this.$emit('clickStation', station, event)
    }
  }
}
</script>

<style scoped lang="scss">
svg:focus {
  outline: none;
}

circle {
  transform-box: fill-box;
  transform-origin: center center;

  &.station {
    cursor: pointer;
    transition: all 0.25s ease;
    fill: var(--station-color);
    stroke: black;

    &.solved {
      fill: var(--success-color) !important;
    }

    &.hint {
      animation: 0.5s infinite alternate hint-animation-1;
    }

    &.correct {
      transform: scale(2);
      fill: var(--success-color) !important;
    }

    &.wrong {
      fill: #ff4545 !important;
    }

    &:hover {
      fill: #eee;
      transform: scale(2);
    }
  }

  &.hint-station {
    pointer-events: none;
    fill: none;
    stroke: var(--text-color);
    animation: 2s infinite ease hint-animation-2;
  }
}

path {
  &.line {
    &.no-color {
      stroke: var(--line-color);
    }
  }
  &.water {
    stroke: var(--water-color);
  }
}
</style>
