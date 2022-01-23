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
import Vue from 'vue';
import { Characters } from 'scripts/store/api';
import CharacterTile from 'scripts/components/CharacterTile.vue';
import Pagination from 'scripts/components/Pagination.vue';
import Searchbar from 'scripts/components/Searchbar.vue';

export default Vue.extend({
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
});
</script>
