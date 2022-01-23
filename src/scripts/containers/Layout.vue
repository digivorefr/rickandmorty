<template>
  <div class="app">
    <header>
      <div class="container">
        <img
          id="logo"
          :src="logo"
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
import Vue from 'vue';
import logo from 'images/rick_and_morty_logo.svg';

export default Vue.extend({
  name: 'Layout',
  data() {
    return {
      logo,
    };
  },
});
</script>
