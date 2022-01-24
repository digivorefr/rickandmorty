// Initial store state.
const defaultState = {
  results: [],
  info: {
    count: 0,
    pages: 1,
  },
  filters: {
    currentPage: 1,
    name: '',
    status: '',
  },
};

// Format a character API data for components
const formatCharacter = (character) => ({
  name: character.name,
  id: character.id,
  status: character.status,
  species: character.species,
  gender: character.gender,
  image: character.image,
  episode: character.episode.map((episode) => episode.replace('https://rickandmortyapi.com/api/episode/', '')),
  origin: { name: character.origin.name },
  location: { name: character.location.name },
});

/* Components */

// Pagination component.
const Pagination = {
  computed: {
    pagesNumber() {
      return this.$store.state.api.info.pages;
    },
    currentPage() {
      return this.$store.state.api.filters.currentPage;
    },
  },
  methods: {
    setPage(index) {
      this.$store.dispatch('setPage', index);
    },
    isActive(index) {
      return {
        active: this.currentPage === index,
      };
    },
  },
  template: `
  <div class="pagination">
    <button
      v-for="n in pagesNumber"
      :key="n"
      :class="isActive(n)"
      @click="()=>setPage(n)"
    >
      {{ n }}
    </button>
  </div>`,
};

// Searchbar component.
const Searchbar = {
  data() {
    return {
      searchValue: this.$store.state.api.filters.name,
      status: this.$store.state.api.filters.status,
      debouncer: null,
    };
  },
  computed: {
  },
  watch: {
    searchValue() {
      // User input is debounced to restreint API calls
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
  template: `
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
  </div>`,
};

// Character Tile in /characters page
const CharacterTile = {
  props: {
    character: {
      type: Object,
      required: true,
    },
  },
  template: `
  <router-link
  :to="{path: '/characters/'+character.id}"
  class="tile tile--character"
>
  <img
    :src="character.image"
    :alt="character.name"
  >
  <h2>
    {{ character.name }}
    <span :class="'character__status character__status--'+character.status.toLowerCase()">
      {{ character.status }}
    </span>
  </h2>
</router-link>
  `,
};

/* Pages */

// /characters page template
const Characters = {
  components: {
    CharacterTile,
    Pagination,
    Searchbar,
  },
  props: {
  },
  computed: {
    characters() {
      return this.$store.state.api.results;
    },
    pagesNumber() {
      return this.$store.state.api.info.pages;
    },
  },
  mounted() {
    this.$store.dispatch('getCharacters');
  },
  template: `
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
  </div>`,
};

// /characters.:id page template
const Character = {
  computed: {
    character() {
      const match = this.$store.state.api.results
        .filter((character) => character.id === this.id);
      if (match.length > 0) return match[0];
      return null;
    },
    id() {
      return parseInt(this.$route.params.id, 10);
    },
  },
  mounted() {
    this.$store.dispatch('getCharacter', this.id);
  },
  template: `
  <div class="character">
    <router-link :to="{name: 'Characters'}">
      &lt; Back to list
    </router-link>
    <div
      v-if="character !== null"
      class="character"
    >
      <div class="character__hero">
        <span :class="'character__status character__status--'+character.status.toLowerCase()">
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
  </div>`,
};


// Not Found page template.
const NotFound = {
  template: '<p>{{message}}</p>',
  data: () => ({
    message : 'Page not found',
  })
}

// App routes.
const routes = [
  { path: '/', redirect: { name: 'Characters' } },
  { path: '/characters', component: Characters, name: 'Characters' },
  { path: '/characters/:id', component: Character, name: 'Character' },
  { path: '*', component: NotFound, name: 'Not Found' },
]

// Initilization method.
function init(){

  // Create Axios instance.
  const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api',
    method: 'get',
  });

  // Shorthand for instance requests.
  const request = (url) => instance.request({url});

  // Vue Router creation.
  const router = new VueRouter({
    mode: 'history',
    routes,
  });

  // Vue Store creation.
  const store = new Vuex.Store({
    modules: {
      api: {
        state: {
          ...defaultState,
        },
        mutations: {
          // Update results infos (count & pages).
          mergeInfos(state, newInfo) {
            state.info = {
              ...state.info,
              ...newInfo,
            };
          },
          // Update characters list
          updateCharacters(state, newResults) {
            state.results = newResults;
          },
          // Update current pagination's page.
          updatePage(state, newPage) {
            state.filters.currentPage = newPage;
          },
          // Update name param in API request (filter by name).
          updateName(state, newName) {
            state.filters.name = newName;
          },
          // Update status param in API request (filter by status).
          updateStatus(state, status) {
            state.filters.status = status;
          },
          // Reset state to default state.
          resetResults(state) {
            state.results = defaultState.results;
            state.info = defaultState.info;
          },
        },
        actions: {
          // Retrieve characters list from API with opetional filters
          getCharacters({ commit, state }) {
            // Build the params string.
            const params = `?page=${state.filters.currentPage}${(state.filters.name !== '')
              ? `&name=${state.filters.name}`
              : ''}${(state.filters.status !== '') ? `&status=${state.filters.status}` : ''}`;
            // Request.
            request(`/character/${params}`)
              .then((response) => {
                const { info, results } = response.data;
                // Format data.
                const formatedResults = results.map((result) => formatCharacter(result));
                const formatedInfo = {
                  count: info.count,
                  pages: info.pages,
                };
                // Commit updates
                commit('updateCharacters', formatedResults);
                commit('mergeInfos', formatedInfo);
              })
              .catch(() => {
                commit('resetResults');
              });
          },
          // Retrieve one single character from its id.
          getCharacter({ commit, state }, id){
            // If the character is already stored, there no need to request API.
            const match = state.results.filter((result) => result.id === id);
            if (match.length > 0) {
              return;
            }
            // Otherwise, API is requested and data updated.
            request(`/character/${id}`)
              .then((response) => {
                const character = formatCharacter(response.data);
                commit('updateCharacters', [character]);
                commit('mergeInfos', { count: 1, pages: 1 });
              })
              .catch(() => {
                router.replace({ name: 'Not Found' });
              });
          },
          // Update the current pagination page.
          setPage({ commit, dispatch, state }, index) {
            if (index <= state.info.pages && index > 0) {
              commit('updatePage', index);
              // Update results
              dispatch('getCharacters');
            }
          },
          // Update the name query param.
          setName({ commit, dispatch, state }, name) {
            const cleanedName = `${name}`.trim();
            if (cleanedName !== state.filters.name) {
              commit('updateName', name);
              // Reset pagination current page.
              dispatch('setPage', 1);
              // Update results.
              dispatch('getCharacters');
            }
          },
          // Update the status query parama.
          setStatus({ commit, dispatch, state }, status) {
            if (['Alive', 'Dead', 'unknown', ''].includes(status) && status !== state.filters.status) {
              commit('updateStatus', status);
              // Reset pagination current page.
              dispatch('setPage', 1);
              // Update results.
              dispatch('getCharacters');
            }
          },
        },
      }
    },
  });

  // Main app creation.
  new Vue({
    el: '#root',
    router,
    store,
    components: {
      'NotFound': NotFound,
      'Characters': Characters,
      'Character': Character,
    }
  });
}

// Launch app when window is loaded.
window.onload = () => {
  init();
};