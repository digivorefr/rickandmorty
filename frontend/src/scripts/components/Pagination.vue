<template>
  <div class="pagination">
    <button
      v-for="n in pagesNumber"
      :key="n"
      :class="isActive(n)"
      @click="()=>setPage(n)"
    >
      {{ n }}
    </button>
  </div>
</template>

<script lang="ts">

/**
 * Characters page.
 */
// eslint-disable-next-line no-restricted-imports

export default {
  name: 'Pagination',
  components: {
  },
  props: {
  },
  computed: {
    pagesNumber(): number {
      return this.$store.state.api.info.pages;
    },
    currentPage(): number {
      return this.$store.state.api.filters.currentPage;
    },
  },
  methods: {
    setPage(index: number) {
      this.$store.dispatch('setPage', index);
    },
    isActive(index: number) {
      return {
        active: this.currentPage === index,
      };
    },
  },
  // mounted() {

  // },
};
</script>
