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
    <g id="underground">
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
          :key="station.id"
          :cx="station.cx"
          :cy="station.cy"
          :class="[
            'station',
            {
              solved: station.solved,
              hint: station.hint,
              correct: station.correct,
              wrong: station.wrong
            },
            station.tries ? `tries-${station.tries}` : ''
          ]"
          r="22"
          stroke-width="2"
          @mouseover="$emit('overStation', station, $event)"
          @mouseleave="$emit('leaveStation')"
          @click="$emit('clickStation', station)"
          @touchend="$emit('clickStation', station)"
        />

        <circle
          v-if="stationStore.question?.hint"
          class="hint-station"
          r="22"
          :cx="stationStore.question.cx"
          :cy="stationStore.question.cy"
        />
      </g>
    </g>
  </svg>
</template>

<script>
import waters from '../data/waters.json'
import lines from '../data/lines.json'
import panzoom from 'panzoom'
import { useStationStore } from '@/stores/stations'

export default {
  props: {
    stations: {
      required: true
    }
  },

  data() {
    return {
      waters,
      lines
    }
  },

  computed: {
    stationStore: () => useStationStore()
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
    fill: white;
    stroke: black;

    &.solved {
      fill: #50c878 !important;
    }

    &.tries-1 {
    }

    &.tries-2 {
    }

    &.tries-3 {
    }

    &.hint {
      animation: 0.5s infinite alternate hint-animation-1;
    }

    &.correct {
      transform: scale(2);
    }

    &.wrong {
      fill: #ff1313;
    }

    &:hover {
      fill: #eee;
      transform: scale(2);
    }
  }

  &.hint-station {
    pointer-events: none;
    fill: none;
    stroke: black;
    animation: 2s infinite ease hint-animation-2;
  }
}

@keyframes hint-animation-1 {
  from {
    fill: white;
  }

  to {
    fill: black;
  }
}

@keyframes hint-animation-2 {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(40);
    opacity: 0;
  }
}
</style>
