<template>
  <div class="searchbar">
    <input
      v-model="searchValue"
      type="text"
      placeholder="Search by name"
    >
    <input
      id="status-all"
      v-model="status"
      type="radio"
      value=""
    >
    <label for="status-all">All results</label>
    <input
      id="status-alive"
      v-model="status"
      type="radio"
      value="Alive"
    >
    <label for="status-alive">Alive</label>
    <input
      id="status-dead"
      v-model="status"
      type="radio"
      value="Dead"
    >
    <label for="status-dead">Dead</label>
    <input
      id="status-unknown"
      v-model="status"
      type="radio"
      value="unknown"
    >
    <label for="status-unknown">Unknown</label>
  </div>
</template>

<script lang="ts">

/**
 * Characters page.
 */
export default {
  name: 'Searchbar',
  components: {
  },
  props: {
  },
  data() {
    return {
      searchValue: this.$store.state.api.filters.name,
      status: this.$store.state.api.filters.status,
      debouncer: 0,
    };
  },
  computed: {
  },
  watch: {
    searchValue() {
      clearTimeout(this.debouncer);
      this.debouncer = setTimeout(this.onTextChange, 500);
    },
    status() {
      this.$store.dispatch('setStatus', this.status);
    },
  },
  methods: {
    onTextChange() {
      this.$store.dispatch('setName', this.searchValue);
    },
  },
};
</script>
