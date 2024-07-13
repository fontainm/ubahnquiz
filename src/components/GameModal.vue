<template>
  <transition name="fade">
    <div v-if="showModal" class="modal" role="dialog">
      <div class="content">
        <button class="close" @click="closeModal">×</button>
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
    padding: 1rem;
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
