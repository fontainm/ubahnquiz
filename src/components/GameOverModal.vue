<template>
  <transition name="fade">
    <div v-if="mainStore.gameOver" class="gameover" role="dialog">
      <div class="content">
        <button class="close" @click="mainStore.resetGame()">×</button>
        <h2>Geschafft!</h2>
        <div class="stats">
          <div>Zeit: {{ mainStore.timer.value }}</div>
          <div>Punkte: {{ mainStore.score }}</div>
        </div>
        <div class="buttons">
          <button @click="share">Teilen</button>
          <button @click="mainStore.resetGame()">Nochmal</button>
        </div>
      </div>
      <transition name="fade">
        <div v-if="showMessage" class="message">Erfolgreich kopiert!</div>
      </transition>
    </div>
  </transition>
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
        console.log('error')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gameover {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
  background: #00000066;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    position: relative;
    background: white;
    width: 300px;
    padding: 2rem;
    border: 1px solid #eee;
    text-align: center;

    h2 {
      margin-top: 0;
      font-weight: 300;
      font-size: 2rem;
    }

    .stats {
      font-size: 1.5rem;
      flex-direction: column;
      margin-bottom: 1rem;

      & > div {
        margin-bottom: 0.5rem;
      }
    }

    .stats,
    .buttons {
      display: flex;
      justify-content: space-around;
    }
  }

  .message {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 2rem;
    background: #333;
    color: white;
    padding: 1rem;
  }

  button {
    width: 100%;
    margin: 0.2rem;

    &.close {
      position: absolute;
      width: auto;
      right: 0;
      top: 0;
      background: white;
      font-size: 1.5rem;
    }
  }
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>
