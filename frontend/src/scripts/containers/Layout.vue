<template>
  <div class="app">
    <header>
      <div class="container">
        <img
          id="logo"
          src="static/images/rick_and_morty_logo.svg"
          width="250"
        >
      </div>
    </header>
    <main>
      <div class="container">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout',
  components: [],
  props: {},
};
</script>
