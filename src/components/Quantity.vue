<template>
    <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                @click.prevent="minus">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model="countQuantity"
                v-on:input="currentCount">

                <button type="button" aria-label="Добавить один товар"
                @click.prevent="plus">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>
</template>
<script>

export default {
  props: ['count'],
  data() {
    return { countQuantity: this.count };
  },
  methods: {
    plus() {
      this.countQuantity += 1;
    },
    minus() {
      this.countQuantity -= 1;
      if (this.countQuantity < 0) { this.countQuantity += 1; }
    },
    currentCount() {
      this.$emit('update:count', this.countQuantity);
    },
  },
};
</script>
