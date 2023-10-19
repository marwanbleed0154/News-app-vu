import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      articles: [],
      visitedHeadlines: [],
    };
  },
  mutations: {
    setArticles(state, data) {
      /* eslint-disable */ 
      state.articles = data;
    },
    setVisitedHeadlines(state, data) {
      state.visitedHeadlines.push(data);
    },
  },
  actions: {
    setArticles(context, data) {
      context.commit('setArticles', data);
    },
    setVisitedHeadlines(context, data) {
      context.commit('setVisitedHeadlines', data);
    },
  },
});
export default store;
