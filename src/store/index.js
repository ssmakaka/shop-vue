import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

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
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((elem) => elem.productId === productId);
      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((elem) => elem.productId !== productId);
    },
  },
  getters: {
    cartDetProd(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetProd.reduce((sum, item) => (item.product.price * item.amount) + sum, 0);
    },
  },
});
