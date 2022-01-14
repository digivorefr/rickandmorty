<template>
  <div class="characters">
    <searchbar />
    <div
      v-if="characters.length > 0"
      class="characters__list"
    >
      <character-tile
        v-for="character in characters"
        :key="character.id"
        :character="character"
      />
    </div>
    <div v-if="characters.length === 0">
      No results
    </div>
    <pagination v-if="pagesNumber > 0" />
  </div>
</template>

<script lang="ts">

/**
 * Characters page.
 */
/* eslint-disable no-restricted-imports */
import { Characters } from '../store/api';
import CharacterTile from '../components/CharacterTile.vue';
import Pagination from '../components/Pagination.vue';
import Searchbar from '../components/Searchbar.vue';
/* eslint-enable no-restricted-imports */

export default {
  name: 'Characters',
  components: {
    CharacterTile,
    Pagination,
    Searchbar,
  },
  props: {
  },
  computed: {
    characters(): Characters {
      return this.$store.state.api.results;
    },
    pagesNumber(): number {
      return this.$store.state.api.info.pages;
    },
  },
  mounted() {
    this.$store.dispatch('getCharacters');
  },
};
</script>
