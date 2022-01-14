<template>
  <div>
    <button
      v-for="n in pagesNumber"
      :key="n"
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
  },
  methods: {
    setPage(index: number) {
      this.$store.dispatch('setPage', index);
    },
  },
  // mounted() {

  // },
};
</script>
