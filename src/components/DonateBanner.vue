<template>
  <div v-if="isVisible" class="donate-banner">
    <div class="donate-wrapper">
      <div class="donate-text">
        Keine Werbung. Keine Tracker. Nur ein freies Projekt für alle. Unterstütz es mit
        einem Kaffee auf Ko-fi, jeder Beitrag hilft ♥️
      </div>
      <div class="donate-buttons">
        <button @click="close" class="donate-later">Vielleicht später</button>
        <a href="https://ko-fi.com/E1E4DARNA" target="_blank">
          <img
            height="36"
            style="border: 0px; height: 36px"
            src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
        /></a>
      </div>
    </div>
    <button @click="close" class="donate-close">&times;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    };
  },

  mounted() {
    const hasDismissed = localStorage.getItem("donationBannerDismissed");
    if (!hasDismissed) {
      setTimeout(() => {
        this.isVisible = true;
      }, 1000);
    }
  },

  methods: {
    close() {
      this.isVisible = false;
      localStorage.setItem("donationBannerDismissed", "true");
    },
  },
};
</script>

<style scoped>
.donate-banner {
  position: fixed;
  bottom: 0;
  background: var(--background-color);
  border-top: 1px solid var(--button-color);
  align-items: center;
  animation: fadeIn 0.4s ease-out;
  width: 100%;
  text-align: center;
}

.donate-wrapper {
  position: relative;
  padding: 16px 24px;
  max-width: 430px;
  margin: auto;
}

.donate-text {
  margin-bottom: 12px;
  pointer-events: none;
}

.donate-buttons {
  display: flex;
  gap: 8px;
  justify-content: space-around;
}

.donate-later {
  height: 36px;
  width: fit-content;
  white-space: nowrap;
}

.donate-close {
  position: absolute;
  top: 0;
  right: 0;
  width: fit-content;
  background: none;
  font-size: 24px;
}

@media screen and (max-width: 576px) {
  .donate-close {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .donate-banner {
    border: 1px solid var(--button-color);
    width: 520px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
