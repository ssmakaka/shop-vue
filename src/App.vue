<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :price-from.sync="filterPriceFrom"
      :price-to.sync="filterPriceTo" :category-id.sync="filterCategoryId"
      :color-cod.sync="filterColorCod" @filters-update="goToFirstPage"></ProductFilter>
      <section class="catalog">
        <ProductList :products="productsPagination"> </ProductList>
        <BasePagination
          v-model="page"
          :count="countProducts"
          :per-page="productsPerPage"
        ></BasePagination>
      </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorCod: 0,
    };
  },
  computed: {
    filteredProducts() {
      let fltProd = products;
      if (this.filterPriceFrom > 0) {
        fltProd = fltProd.filter((product) => product.price > this.filterPriceFrom);
      }
      if (this.filterPriceTo > 0) {
        fltProd = fltProd.filter((product) => product.price < this.filterPriceTo);
      }
      if (this.filterCategoryId) {
        fltProd = fltProd.filter((product) => product.categoryId === this.filterCategoryId);
      }
      if (this.filterColorCod) {
        fltProd = fltProd.filter((product) => product.colorCod.includes(this.filterColorCod));
      }
      return fltProd;
    },
    productsPagination() {
      const offset = (this.page - 1) * this.productsPerPage;
      return this.filteredProducts.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
    // colorProducts() {
    //   return this.filteredProducts.length;
    // },
  },
  methods: {
    goToFirstPage() {
      this.page = 1;
    },
  },
};
</script>
