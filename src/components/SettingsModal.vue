<script setup>
import GameModal from './GameModal.vue'
import DonateInfo from './DonateInfo.vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <GameModal :showModal="showModal" @close="$emit('close')" icon="adjustments-horizontal">
    <div class="difficulty">
      <div class="switch">
        <input
          v-model="difficulty"
          value="easy"
          type="radio"
          name="difficulty"
          class="switch-input"
          id="easy"
        />
        <label class="switch-label switch-label-y" for="easy">
          <div class="label-title">Lernmodus</div>
        </label>
        <input
          v-model="difficulty"
          value="normal"
          type="radio"
          name="difficulty"
          class="switch-input"
          id="normal"
        />
        <label class="switch-label switch-label-i" for="normal">
          <div class="label-title">Standard</div>
        </label>
        <input
          v-model="difficulty"
          value="hard"
          type="radio"
          name="difficulty"
          class="switch-input"
          id="hard"
        />
        <label class="switch-label switch-label-n" for="hard">
          <div class="label-title">Hardcore</div>
        </label>
        <span class="switch-selector"></span>
      </div>
      <div class="difficulty-info">{{ difficultyInfo }}</div>
    </div>
    <div class="buttons">
      <div class="row">
        <button @click="toggleDark()">
          <i :class="isDark ? 'light-icon-sun' : 'light-icon-moon'"></i>
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </button>
        <button @click="handleClickReset">
          <i class="light-icon-arrow-back"></i>
          Neustart
        </button>
      </div>
      <div class="row">
        <button>
          <a href="https://github.com/fontainm/ubahnquiz" target="_blank" class="link-button">
            <i class="light-icon-brand-github"></i>GitHub
          </a>
        </button>
        <button>
          <a href="mailto:hallo@mathiasfontain.at" class="link-button">
            <i class="light-icon-mail"></i>Kontakt
          </a>
        </button>
      </div>
    </div>
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

  data() {
    return {
      difficulty: 'normal'
    }
  },

  computed: {
    mainStore: () => useMainStore(),

    difficultyInfo() {
      switch (this.difficulty) {
        case 'easy':
          return 'Lernmodus: Perfekt für das erstmalige Lernen'
        case 'normal':
          return 'Standard: Für die erste Herausforderung'
        case 'hard':
          return "Schwierig: Ohne Farbhilfe, dafür gibt's Extrapunkte"
      }
      return ''
    }
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
.buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
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

.difficulty {
  margin-bottom: 16px;

  .switch {
    position: relative;
    height: 50px;
    width: 300px;
    background: var(--button-color);
    margin-bottom: 8px;
  }

  .switch-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    float: left;
    width: 100px;
    height: 100%;
    color: var(--text-color);
    text-align: center;
    cursor: pointer;

    .label-title {
      font-size: 1rem;
    }

    .label-info {
      font-size: 0.75rem;
    }
  }

  .switch-input {
    display: none;
  }

  .switch-input:checked + .switch-label {
    color: var(--background-color);
    transition: 0.15s ease-out;
    transition-property: color, text-shadow;
  }

  .switch-input:checked + .switch-label-y ~ .switch-selector {
    transform: translateX(0%);
  }
  .switch-input:checked + .switch-label-i ~ .switch-selector {
    transform: translateX(100%);
  }
  .switch-input:checked + .switch-label-n ~ .switch-selector {
    transform: translateX(200%);
  }

  .switch-selector {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    display: block;
    width: 100px;
    height: 50px;
    background-color: var(--text-color);
    transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  .difficulty-info {
    font-size: 0.75rem;
  }
}
</style>
