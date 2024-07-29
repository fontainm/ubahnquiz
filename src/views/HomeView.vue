<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="page">
    <AppHeader>
      <div>U-Bahn Quiz</div>
      <div class="settings">
        <i class="light-icon-adjustments-horizontal" @click="showSettingsModal = true"></i>
      </div>
    </AppHeader>
    <div>
      <h2>Wähle eine Stadt</h2>
      <div class="cities">
        <div v-for="city in cities" :key="city.id">
          <RouterLink :to="`/${city.route}`" @click="mainStore.resetGame()" class="city">
            <button class="large">
              <div class="city-name">{{ city.name }}</div>
              <div class="city-lines">{{ city.lines }} Linien</div>
              <div class="city-stations">{{ city.stations }} Stationen</div>
              <i class="play light-icon-triangle"></i>
            </button>
          </RouterLink>
        </div>
        <a href="mailto:kontakt@mathiasfontain.at">
          <button class="large negative">Deine Stadt ist nicht dabei?</button>
        </a>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'

export default {
  data() {
    return {
      cities: [
        { id: 0, route: 'wien', name: 'Wien', lines: 5, stations: 99 },
        { id: 1, route: 'graz', name: 'Graz', lines: 2, stations: 27 },
        { id: 2, route: 'berlin', name: 'Berlin', lines: 9, stations: 175 }
      ]
    }
  },

  computed: {
    mainStore: () => useMainStore()
  }
}
</script>

<style lang="scss">
.cities {
  display: flex;
  justify-content: center;

  .city {
    .city-name {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    .city-lines,
    .city-stations {
      font-size: 1rem;
    }

    &:hover {
      .play {
        opacity: 1;
      }
    }

    .play {
      opacity: 0;
      position: absolute;
      transform: rotate(90deg);
      font-size: 6rem !important;
      color: var(--background-color) !important;
    }
  }
}
</style>
