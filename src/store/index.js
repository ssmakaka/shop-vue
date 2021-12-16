import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{ productId: 1, amount: 2 }],
  },
  mutations: {
    addProductToCart(state, payload) {
      const item = state.cartProducts.find((elem) => elem.productId === payload.productId);
      if (item) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push(
          {
            productId: payload.productId,
            amount: payload.amount,
          },
        );
      }
    },
  },
});
