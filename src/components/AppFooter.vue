<template>
  <div class="footer">
    <div class="links">
      <i class="light-icon-mail"></i>
      <i class="light-icon-brand-github"></i>
      <i class="light-icon-currency-euro"></i>
    </div>
    <div class="copyright">
      <i class="light-icon-copyright"></i> Mathias Fontain 2024
    </div>
  </div>
</template>

<script></script>

<style lang="scss">
.footer {
  margin-top: auto;
  padding: 2rem;
  background: var(--button-color);

  .links {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    i {
      font-size: 2rem;
    }
  }

  .copyright {
    display: flex;
    align-items: center;
    justify-content: center;
    
    i {
      display: inline-flex;
      margin-right: 0.25rem;
    }
  }
}
</style>
