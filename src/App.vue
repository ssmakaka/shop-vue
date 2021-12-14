<template>
<!-- <MainPage v-if="currentPage === 'main'"/>
<ProductPage v-else-if="currentPage === 'product'"/>
<NotPageFound v-else/> -->
<component :is='currentPageComponents' :page-params='currentPageParams'
@gotoPage="(pageName, pageParams) => gotoPage(pageName,pageParams)"/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotPageFound from '@/pages/NotPageFound.vue';

const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {},
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  computed: {
    currentPageComponents() {
      return routes[this.currentPage] || 'NotPageFound';
    },
  },
  components: { MainPage, ProductPage, NotPageFound },
};
</script>
