<template>
  <transition name="fade">
    <div v-if="showModal" class="modal" role="dialog">
      <div class="content">
        <button class="close" @click="closeModal">×</button>
        <div class="icon">
          <i :class="`light-icon-${icon}`"></i>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    showModal: {
      required: true
    },
    icon: {
      required: true
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
  background: #00000077;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    position: relative;
    background: var(--background-color);
    width: 300px;
    padding: 16px;
    border: 1px solid var(--button-color);
    text-align: center;

    .icon {
      background: var(--background-color);
      border-radius: 50%;
      margin-bottom: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 3rem;
      }
    }
  }

  button {
    &.close {
      position: absolute;
      width: auto;
      height: auto;
      right: 0;
      top: 0;
      background: transparent;
      font-size: 1.5rem;
      margin: 0;
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
