<script setup>
import GameModal from './GameModal.vue'
</script>

<template>
  <GameModal :showModal="showModal" @close="$emit('close')">
    <h2>Settings</h2>
    <div class="buttons">
      <button disabled>
        <i class="light-icon-moon"></i>
        Dark Mode
      </button>
      <button @click="handleClickReset">
        <i class="light-icon-arrow-back"></i>
        Neustart
      </button>
      <a href="https://www.github.com/fontainm" target="_blank">
        <button><i class="light-icon-brand-github"></i>GitHub</button>
      </a>
    </div>
  </GameModal>
</template>

<script>
import { useMainStore } from '@/stores/main'

export default {
  props: {
    showModal: {
      required: true
    }
  },

  computed: {
    mainStore: () => useMainStore()
  },

  methods: {
    handleClickReset() {
      this.mainStore.resetGame()
      this.closeModal()
    },

    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-direction: column;
}
</style>
