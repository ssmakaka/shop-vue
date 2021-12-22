<template>
    <div class="form__counter">
                <button type="button" aria-label="Убрать один товар"
                @click.prevent="minus">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="number" v-model.number="countQuantity" min="0" readonly="true">

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
      this.$emit('update:count', this.countQuantity);
    },
    minus() {
      this.countQuantity -= 1;
      if (this.countQuantity < 0) { this.countQuantity += 1; }
      this.$emit('update:count', this.countQuantity);
    },
  },
};
</script>
