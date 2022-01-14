<template>
  <div>
    <router-link :to="{name: 'Characters'}">
      Back
    </router-link>
    <div
      v-if="character !== null"
      class="character"
    >
      <h1>Character ID {{ id }} : {{ character.name }}</h1>
      <img :src="character.image">
    </div>
  </div>
</template>

<script lang="ts">

/**
 * Characters page.
 */
/* eslint-disable no-restricted-imports */
import { Character } from '../store/api';
/* eslint-enable no-restricted-imports */

export default {
  name: 'Character',
  components: {
  },
  props: {
  },
  computed: {
    character(): Character | null {
      const match = this.$store.state.api.results
        .filter((character) => character.id === this.id);
      if (match.length > 0) return match[0];
      return null;
    },
    id(): number {
      return parseInt(this.$route.params.id, 10);
    },
  },
  mounted() {
    this.$store.dispatch('getCharacter', this.id);
  },
};
</script>
