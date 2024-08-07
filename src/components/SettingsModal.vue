<script setup>
import GameModal from './GameModal.vue'
import DifficultySettings from './DifficultySettings.vue'
import DonateInfo from './DonateInfo.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <GameModal :showModal="showModal" @close="closeModal" icon="adjustments-horizontal">
    <DifficultySettings @reset="handleReset" />
    <hr />
    <div class="buttons">
      <button @click="toggleDark()">
        <i :class="isDark ? 'light-icon-sun' : 'light-icon-moon'"></i>
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
      <div class="row">
        <button class="button-link">
          <a href="https://github.com/fontainm/ubahnquiz" target="_blank" class="link-button">
            <i class="light-icon-brand-github"></i>GitHub
          </a>
        </button>
        <button class="button-link">
          <a href="mailto:hallo@mathiasfontain.at" class="link-button">
            <i class="light-icon-mail"></i>Kontakt
          </a>
        </button>
      </div>
    </div>
    <hr />
    <DonateInfo />
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
    handleClickTheme() {
      this.toggleDark()
      this.closeModal()
    },

    handleReset() {
      this.mainStore.resetGame()
      this.closeModal()
    },

    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.row {
  display: flex;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  button {
    width: 50%;

    &:not(:last-child) {
      margin: 0 8px 0 0;
    }
  }
}
</style>
