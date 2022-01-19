import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
const createStore = () => {
  return new Vuex.Store({
    state: {
      // ログインしているユーザー情報
      loginUser: "",
      // ログインしているかのフラグ
      loginFlag: false,
    },
    mutations: {
      /**
       * ログインしたユーザーをstateに格納する.
       * @param state -ステート
       * @param payload - ログインしているユーザー情報
       */
      setLoginUser(state, payload) {
        state.loginUser = payload;
      },

      /**
       * ログインフラグを上げる.
       * @param state -ステート
       */
      loginFlag(state) {
        state.loginFlag = true;
      },

      /**
       * ログインフラグを下ろす.
       * @param state　-ステート
       */
      logOutFlag(state) {
        // stateのログインしているユーザーを初期化
        state.loginUser = "";
        state.loginFlag = false;
      },
    },
    actions: {},
    getters: {
      /**
       * ログインしているユーザー情報を返す.
       * @param state -ステート
       * @returns -ユーザー情報
       */
      getLoginUser(state) {
        return state.loginUser;
      },
      /**
       * ログイン状態を返す.
       * @param state -ステート
       * @returns -ログイン状態
       */
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
