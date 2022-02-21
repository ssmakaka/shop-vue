<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.img"
        width="120"
        height="120"
        :alt="item.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.product.id }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="minus">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="number" value="1" v-model.number="amount" name="count" min="0" readonly="true"/>

      <button type="button" aria-label="Добавить один товар" @click.prevent="plus">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.product.price * item.amount) | numberFormat }} BYN
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent = "deleteProduct(item.productId)"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
// import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  filters: {
    numberFormat,
  },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    // ...mapActions(['deleteCartProduct']),

    deleteProduct(productId) {
      // this.deleteCartProduct({ productId: value });
      this.$store.dispatch('deleteCartProduct', { productId });
    },

    plus() {
      this.amount += 1;
    },
    minus() {
      this.amount -= 1;
      if (this.amount < 0) { this.amount += 1; }
    },
    // ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
  },
};
</script>
