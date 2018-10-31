export default {
  state: {
    count: 1
  },
  getters: {
    count: state => state.count
  },
  mutations: {
    // 拿到数据后做处理，然后改变state状态
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    EDIT_COUNT: (state, { count }) => {
      state.count += count;
    }
  },
  actions: {
    editCount({ commit }, { param }) {
      // HTTP请求写在这获取数据后commit
      commit("EDIT_COUNT", {
        count: param
      });
    }
  }
};