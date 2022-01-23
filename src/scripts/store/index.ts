import Vuex, { Store } from 'vuex';
import api from 'scripts/store/api';

const store = (): Store<unknown> => new Vuex.Store({
  modules: {
    api,
  },
});

export default store;
