<template>
<!-- <MainPage v-if="currentPage === 'main'"/>
<ProductPage v-else-if="currentPage === 'product'"/>
<NotPageFound v-else/> -->
<component :is='currentPageComponents' :page-params='currentPageParams'/>
</template>

<script>
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import NotPageFound from '@/pages/NotPageFound.vue';
import eventBus from '@/eventBus';

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
  created() {
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
};
</script>
