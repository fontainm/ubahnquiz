<script setup>
import GameModal from './GameModal.vue'
import DonateInfo from './DonateInfo.vue'
import DifficultySettings from './DifficultySettings.vue'
</script>

<template>
  <div>
    <GameModal :showModal="mainStore.gameOver" @close="mainStore.setGameOver(false)" icon="trophy">
      <div class="stats">
        <div class="badge">{{ mainStore.selectedDifficulty.name }}</div>
        <div>Zeit: {{ mainStore.timer.value }}</div>
        <div>Punkte: {{ mainStore.score }}</div>
      </div>
      <button @click="share">
        <i class="light-icon-share"></i>
        Teilen
      </button>
      <hr />
      <DifficultySettings :showApply="false" @reset="handleReset" />
      <hr />
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
    handleReset() {
      this.mainStore.resetGame()
    },

    async share() {
      try {
        await navigator.clipboard.writeText(
          `Meine Punkte: ${this.mainStore.score}\nMeine Zeit: ${this.mainStore.timer.value}\n(${this.mainStore.selectedDifficulty.name})\nSchaffst du das auch?\nhttps://ubahnquiz.at`
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
  margin-bottom: 16px;

  & > div {
    margin-bottom: 8px;
  }

  .badge {
    font-size: 1rem;
    background: var(--success-color);
    color: var(--background-color);
    width: auto;
    display: inline-block;
    padding: 8px;
  }
}

.message {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -64px;
  background: #333;
  color: white;
  padding: 16px;
}
</style>
