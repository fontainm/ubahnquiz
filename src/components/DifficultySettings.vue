<script setup>
import { difficulties } from '../consts/difficulties'
</script>

<template>
  <div class="difficulty">
    <div class="difficulty-settings">
      <div class="difficulty-title">Schwierigkeit ändern:</div>
      <div class="switch">
        <input
          v-model="selectedDifficulty"
          :value="difficulties.EASY"
          type="radio"
          name="difficulty"
          class="switch-input"
          id="easy"
        />
        <label class="switch-label switch-label-0" for="easy">
          <div class="label-title">Lernmodus</div>
          <div class="difficulty-info">
            {{ difficulties.EASY.text }}
          </div>
        </label>
        <input
          v-model="selectedDifficulty"
          :value="difficulties.STANDARD"
          type="radio"
          name="difficulty"
          class="switch-input"
          id="normal"
        />
        <label class="switch-label switch-label-1" for="normal">
          <div class="label-title">Standard</div>
          <div class="difficulty-info">
            {{ difficulties.STANDARD.text }}
          </div>
        </label>
        <input
          v-model="selectedDifficulty"
          :value="difficulties.HARD"
          type="radio"
          name="difficulty"
          class="switch-input"
          id="hard"
        />
        <label class="switch-label switch-label-2" for="hard">
          <div class="label-title">Schwierig</div>
          <div class="difficulty-info">
            {{ difficulties.HARD.text }}
          </div>
        </label>
        <span class="switch-selector"></span>
      </div>
    </div>
    <button
      :class="{
        highlight: selectedDifficulty.id !== mainStore.selectedDifficulty.id || !showApply,
        success: selectedDifficulty.id !== mainStore.selectedDifficulty.id && showApply
      }"
      @click="handleClickReset"
    >
      <i
        :class="
          selectedDifficulty.id === mainStore.selectedDifficulty.id || !showApply
            ? 'light-icon-arrow-back'
            : 'light-icon-device-floppy'
        "
      ></i>
      <span>{{
        selectedDifficulty.id === mainStore.selectedDifficulty.id || !showApply
          ? 'Neustarten'
          : 'Anwenden und Neustarten'
      }}</span>
    </button>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'

export default {
  props: {
    showApply: {
      default: true
    }
  },

  data() {
    return {
      selectedDifficulty: difficulties.STANDARD
    }
  },

  computed: {
    mainStore: () => useMainStore()
  },

  mounted() {
    this.selectedDifficulty = this.mainStore.selectedDifficulty
  },

  methods: {
    handleClickReset() {
      if (this.mainStore.selectedDifficulty !== this.selectedDifficulty) {
        this.mainStore.selectedDifficulty = this.selectedDifficulty
      }
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss">
.difficulty {
  margin-bottom: 8px;

  .difficulty-title {
    margin-bottom: 8px;
  }

  .difficulty-settings {
    margin-bottom: 8px;
  }

  .difficulty-info {
    position: absolute;
    z-index: 1;
    font-size: 0.75rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: var(--text-color);
    color: var(--background-color);
    width: 150px;
    height: 32px;
    padding: 8px;
    top: calc(-100% - 8px);
    display: flex;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: var(--text-color) transparent transparent transparent;
    }
  }

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
    transition: all 0.2s ease;

    .label-title {
      font-size: 1rem;
    }

    .label-info {
      font-size: 0.75rem;
    }

    &:hover {
      .difficulty-info {
        opacity: 1;
      }
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

  .switch-input:checked + .switch-label-0 ~ .switch-selector {
    transform: translateX(0%);
  }
  .switch-input:checked + .switch-label-1 ~ .switch-selector {
    transform: translateX(100%);
  }
  .switch-input:checked + .switch-label-2 ~ .switch-selector {
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
}
</style>
