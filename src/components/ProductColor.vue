<template>

    <li class="colors__item">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio"
                  :value="color" :name="productID" v-model="color">
                  <span class="colors__value" :style="{backgroundColor: color}">
                  </span>
                </label>
    </li>
</template>
<script>
export default {
  props: ['colorArray', 'color', 'productID'],
};
</script>
