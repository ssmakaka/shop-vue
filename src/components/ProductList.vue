<template>
  <ul class="catalog__list">
  <ProductItem v-for='(product, index) in products' :key='index' :prod="product" ></ProductItem>
  </ul>
</template>
<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
