<script setup>
import GameModal from './GameModal.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <GameModal :showModal="showModal" @close="$emit('close')" icon="adjustments-horizontal">
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
      <div class="donate">
        <div class="donate-text">
          Wenn dir mein Projekt gefällt und du mich unterstützen möchtest, freue ich mich über eine
          Spende via PayPal
        </div>
        <a href="https://www.paypal.com/donate/?hosted_button_id=9KGFJJ4G3L6ZJ" target="_blank">
          <button class="donate-button">
            <i class="light-icon-brand-paypal"></i>
            Unterstützen
          </button>
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

<style lang="scss">
.donate {
  .donate-text {
    font-size: 0.75rem;
    padding: 0 0.5rem 0.5rem;
  }

  .donate-button {
    height: 65px;
    width: 280px;
    flex-direction: row;
    margin: 0 0 1rem 0;

    i {
      margin: 0 0.5rem 0 0;
    }
  }
}
</style>
