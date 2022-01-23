<template>
  <router-link
    :to="{path:`/characters/${character.id}`}"
    class="tile tile--character"
  >
    <img
      :src="character.image"
      :alt="character.name"
    >
    <h2>
      {{ character.name }}
      <span :class="`character__status character__status--${character.status.toLowerCase()}`">
        {{ character.status }}
      </span>
    </h2>
  </router-link>
</template>

<script lang="ts">

/**
 * Characters page.
 */
// eslint-disable-next-line no-restricted-imports
import Vue from 'vue';
import type { Character } from 'scripts/store/api';

export default Vue.extend({
  name: 'CharacterTile',
  components: {
  },
  props: {
    character: {
      type: Object as () => Character,
      required: true,
    },
  },
  computed: {
  },
  // mounted() {
  // },
});
</script>
