<template>
  <div class="tile character">
    <img
      :src="character.image"
      :alt="character.name"
    >
    <h2>
      {{ character.name }}
    </h2>
  </div>
</template>

<script lang="ts">

/**
 * Characters page.
 */
// eslint-disable-next-line no-restricted-imports
import type { Character } from '../store/api';

export default {
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
};
</script>
