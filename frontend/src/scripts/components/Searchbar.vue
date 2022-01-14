<template>
  <div class="searchbar">
    <input
      v-model="searchValue"
      type="text"
      placeholder="Search by name"
    >

    <label for="status-all">
      <input
        id="status-all"
        v-model="status"
        type="radio"
        value=""
      >
      All results
    </label>

    <label for="status-alive">
      <input
        id="status-alive"
        v-model="status"
        type="radio"
        value="Alive"
      >
      Alive
    </label>

    <label for="status-dead">
      <input
        id="status-dead"
        v-model="status"
        type="radio"
        value="Dead"
      >
      Dead
    </label>

    <label for="status-unknown">
      <input
        id="status-unknown"
        v-model="status"
        type="radio"
        value="unknown"
      >
      Unknown
    </label>
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
