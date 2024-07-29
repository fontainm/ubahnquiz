<template>
  <div class="header">
    <slot />
  </div>
  <div class="separator"></div>
</template>

<script></script>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 2rem;
  background: var(--background-color);
}

.separator {
  height: 10px;
  background-color: var(--button-color);
  margin-bottom: 1rem;
}
</style>
