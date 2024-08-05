<script setup>
import GameModal from './GameModal.vue'
import DonateInfo from './DonateInfo.vue'
</script>

<template>
  <div>
    <GameModal :showModal="mainStore.gameOver" @close="mainStore.setGameOver(false)" icon="trophy">
      <div class="stats">
        <div>Zeit: {{ mainStore.timer.value }}</div>
        <div>Punkte: {{ mainStore.score }}</div>
      </div>
      <div class="buttons">
        <button @click="share">
          <i class="light-icon-share"></i>
          Teilen
        </button>
        <button @click="mainStore.resetGame()">
          <i class="light-icon-arrow-back"></i>
          Neustart
        </button>
      </div>
      <DonateInfo />
      <transition name="fade">
        <div v-if="showMessage" class="message">Erfolgreich kopiert!</div>
      </transition>
    </GameModal>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'

export default {
  data() {
    return {
      showMessage: false
    }
  },

  computed: {
    mainStore: () => useMainStore()
  },

  methods: {
    async share() {
      try {
        await navigator.clipboard.writeText(
          `Meine Punkte: ${this.mainStore.score}\nMeine Zeit: ${this.mainStore.timer.value}\nSchaffst du das auch?\nhttps://ubahnquiz.at`
        )
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 2000)
      } catch ($) {
        //
      }
    }
  }
}
</script>

<style scoped lang="scss">
.stats {
  font-size: 1.5rem;
  margin-bottom: 1rem;

  & > div {
    margin-bottom: 0.5rem;
  }
}

.message {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -4rem;
  background: #333;
  color: white;
  padding: 1rem;
}
</style>
