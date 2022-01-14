import Vuex from "vuex";
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
  });
};

export default createStore;
