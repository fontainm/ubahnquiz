<script setup>
import { difficulties } from '../consts/difficulties'
</script>

<template>
  <div class="difficulty">
    <div class="difficulty-settings">
      <div class="difficulty-title">Schwierigkeit ändern:</div>
      <div class="switch">
        <div v-for="difficulty in difficulties" :key="difficulty.id" class="switch-difficulty">
          <input
            v-model="selectedDifficulty"
            :value="difficulty"
            type="radio"
            name="difficulty"
            class="switch-input"
            :id="difficulty.id"
          />
          <label class="switch-label" :for="difficulty.id">
            <div class="label-title" :class="{ active: selectedDifficulty.id === difficulty.id }">
              {{ difficulty.name }}
            </div>
            <div class="label-info">{{ difficulty.text }}</div>
          </label>
        </div>
        <span
          class="switch-selector"
          :style="`transform: translateX(${selectedDifficulty.level * 100}%)`"
        ></span>
      </div>
    </div>
    <button
      :class="{
        highlight: selectedDifficulty.id !== mainStore.selectedDifficulty.id && showApply,
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

  .label-info {
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
    display: flex;
    position: relative;
    height: 50px;
    width: 300px;
    background: var(--button-color);
    margin-bottom: 8px;
  }

  .switch-difficulty {
    height: 100%;
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
      color: var(--text-color);
      -webkit-user-select: none;
      user-select: none;

      &.active {
        color: var(--background-color);
      }
    }

    &:hover {
      .label-info {
        opacity: 1;
      }
    }
  }

  .switch-input {
    display: none;
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
