<template>
<li class="catalog__item" >
            <router-link class="catalog__pic" :to="{name: 'product', params: {id: prod.id}}">
              <img :src="prod.img" :alt="prod.title">
            </router-link>

            <h3 class="catalog__title">
              <a href="#">
                {{ prod.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ prod.price | numberFormat}} BYN
            </span>

            <ul class="colors colors--black">
              <ProductColor v-for='color in prod.colors'
              :key="color.id" :colorArray="prod.colors" :color="color"
              :productID="prod.id" />
            </ul>
          </li>
</template>

<script>
import ProductColor from './ProductColor.vue';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { ProductColor },
  props: ['prod'],
  methods: {
    gotoPage,
  },
  filters: {
    numberFormat,
  },
};
</script>
