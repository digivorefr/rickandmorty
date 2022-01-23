<template>
  <div class="character">
    <router-link :to="{name: 'Characters'}">
      &lt; Back to list
    </router-link>
    <div
      v-if="character !== null"
      class="character"
    >
      <div class="character__hero">
        <span :class="`character__status character__status--${character.status.toLowerCase()}`">
          {{ character.status }}
        </span>
        <img
          class="character__image"
          :src="character.image"
        >
      </div>
      <h1 class="character__title">
        {{ character.name }}
      </h1>
      <ul class="character__details">
        <li>
          <span>Gender</span>
          <span>{{ character.gender }}</span>
        </li>
        <li>
          <span>Last seen</span>
          <span>{{ character.location.name }}</span>
        </li>
        <li>
          <span>Specie</span>
          <span>{{ character.species }}</span>
        </li>
        <li>
          <span>Origin</span>
          <span>{{ character.origin.name }}</span>
        </li>
        <li>
          <span>Seen on episodes</span>
          <span>{{ character.episode.join(', ') }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">

/**
 * Characters page.
 */
import Vue from 'vue';
import { Character } from 'scripts/store/api';

export default Vue.extend({
  name: 'Character',
  components: {
  },
  props: {
  },
  computed: {
    character(): Character | null {
      const match = this.$store.state.api.results
        .filter((character: Character) => character.id === this.id);
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
});
</script>
