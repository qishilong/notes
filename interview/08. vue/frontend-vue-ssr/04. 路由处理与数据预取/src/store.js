// 数据预取
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default function () {
  const store = new Vuex.Store({
    state: {
      name: '',
    },
    mutations: {
      setName(state, val) {
        state.name = val;
      }
    },
    actions: {
      getName({commit}) {
        return new Promise(resolve => {
          setTimeout(function () {
            resolve('SSR');
          }, 300);
        }).then(val => {
          commit('setName', val);
        })
      }
    }
  });
  return store;
}