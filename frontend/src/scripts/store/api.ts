import { Module } from 'vuex';
import router from 'scripts/router';
import request from 'scripts/helpers/request';

export type Info = {
  count: number;
  pages: number;
}
export type Filters = {
  currentPage: number;
  name: string;
  status: string;
}
export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  episode: string[];
  origin: { name: string };
  location: { name: string };
};
export type Characters = Character[];
export type State = {
  results: Characters;
  info: Info;
  filters: Filters;
};

const defaultState: State = {
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

const formatCharacter = (character: Character): Character => ({
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default <Module<any, any>>{
  state: {
    ...defaultState,
  },
  /* eslint-disable no-param-reassign */
  mutations: {
    mergeInfos(state, newInfo) {
      state.info = {
        ...state.info,
        ...newInfo,
      };
    },
    updateCharacters(state, newResults) {
      state.results = newResults;
    },
    updatePage(state, newPage: number) {
      state.filters.currentPage = newPage;
    },
    updateName(state, newName: string) {
      state.filters.name = newName;
    },
    updateStatus(state, status: string) {
      state.filters.status = status;
    },
    resetResults(state) {
      state.results = defaultState.results;
      state.info = defaultState.info;
    },
  },
  /* eslint-enable no-param-reassign */
  actions: {
    getCharacters({ commit, state }) {
      const params = `?page=${state.filters.currentPage}${(state.filters.name !== '')
        ? `&name=${state.filters.name}`
        : ''}${(state.filters.status !== '') ? `&status=${state.filters.status}` : ''}`;
      request(`/character/${params}`)
        .then((response) => {
          const { info, results } = response.data as { results: Characters, info: Info };
          const formatedResults = results.map((result) => formatCharacter(result));
          const formatedInfo = {
            count: info.count,
            pages: info.pages,
          };
          commit('updateCharacters', formatedResults);
          commit('mergeInfos', formatedInfo);
        })
        .catch(() => {
          commit('resetResults');
        });
    },
    getCharacter({ commit, state }, id: number): void {
      const match = state.results.filter((result: Character) => result.id === id);
      if (match.length > 0) {
        return;
      }
      request(`/character/${id}`)
        .then((response) => {
          const character = formatCharacter(response.data as Character);
          commit('updateCharacters', [character]);
          commit('mergeInfos', { count: 1, pages: 1 });
        })
        .catch(() => {
          router.replace({ name: 'Not Found' });
        });
    },
    setPage({ commit, dispatch, state }, index: number) {
      if (index <= state.info.pages && index > 0) {
        commit('updatePage', index);
        dispatch('getCharacters');
      }
    },
    setName({ commit, dispatch, state }, name: string) {
      const cleanedName = `${name}`.trim();
      if (cleanedName !== state.filters.name) {
        commit('updateName', name);
        dispatch('setPage', 1);
        dispatch('getCharacters');
      }
    },
    setStatus({ commit, dispatch, state }, status: string) {
      if (['Alive', 'Dead', 'unknown', ''].includes(status) && status !== state.filters.status) {
        commit('updateStatus', status);
        dispatch('setPage', 1);
        dispatch('getCharacters');
      }
    },
  },
};
