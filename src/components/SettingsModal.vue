<script setup>
import GameModal from './GameModal.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <GameModal :showModal="showModal" @close="$emit('close')">
    <h2>Settings</h2>
    <div class="buttons">
      <button @click="toggleDark()">
        <i :class="isDark ? 'light-icon-sun' : 'light-icon-moon'"></i>
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
      <button @click="handleClickReset">
        <i class="light-icon-arrow-back"></i>
        Neustart
      </button>
      <div class="contact">
        <a href="https://github.com/fontainm/ubahnquiz" target="_blank">
          <button><i class="light-icon-brand-github"></i>GitHub</button>
        </a>
        <a href="mailto:hallo@mathiasfontain.at">
          <button><i class="light-icon-mail"></i>Kontakt</button>
        </a>
      </div>
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
    handleClickTheme() {
      this.toggleDark()
      this.closeModal()
    },

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

.contact {
  display: flex;

  > a {
    width: 50%;

    &:first-child {
      margin-right: 0.6rem;
    }
  }
}
</style>
