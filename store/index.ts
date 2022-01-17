import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
const createStore = () => {
  return new Vuex.Store({
    state: {
      loginUser: "",
      loginFlag: false,
    },
    mutations: {
      setLoginUser(state, payload) {
        state.loginUser = payload;
      },
      loginFlag(state) {
        state.loginFlag = true;
      },
      logOutFlag(state) {
        state.loginFlag = false;
      },
    },
    actions: {},
    getters: {
      getLoginUser(state) {
        return state.loginUser;
      },
      getLoginFlag(state) {
        return state.loginFlag;
      },
    },

    plugins: [
      // 更新してもstoreのデータを残す(SSR使用不可)
      createPersistedState({
        // ストレージのキーを指定
        key: "vuex",

        paths: ["loginUser", "loginFlag"],

        // ストレージの種類
        storage: window.sessionStorage,
      }),
    ],
  });
};

export default createStore;
