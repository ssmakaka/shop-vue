<template>
<li class="catalog__item" >
            <a class="catalog__pic" href="#">
              <img :src="prod.img" :alt="prod.title">
            </a>

            <h3 class="catalog__title">
              <a href="#">
                {{ prod.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ prod.price }} BYN
            </span>

            <ul class="colors colors--black">
              <ProductColor v-for='color in prod.colorCod'
              :key="color" :colorArray="prod.colorCod" :color="color"
              :productID="prod.id" />
            </ul>
          </li>
</template>

<script>
import ProductColor from './ProductColor.vue';

export default {
  components: { ProductColor },
  props: ['prod'],
};
</script>
