<template>
<div class="preloader" v-if='productsLoading'>
        <div class="dash uno"></div>
        <div class="dash dos"></div>
        <div class="dash tres"></div>
        <div class="dash cuatro"></div>
      </div>
      <div v-else-if='!loadProducts'>Произошла ошибка загрузки товаров
        <button @click.prevent="loadProducts">Попробовать еще раз</button></div>
    <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{ category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ product.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="product.image.file.url" :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent='addToCart'>
            <b class="item__price">
              {{ product.price | numberFormat}}
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <ProductColor v-for='color in colors'
              :key="color.code" :colorArray="colors" :color="color"
              :productID="product.id" />
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item" value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio"
                    name="sizes-item" value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
<Quantity :count.sync="productAmount"/>
              <button class="button button--primery" type="submit" :disabled="productAddSending">
                В корзину
              </button>
            </div>

            <div v-show="productAdded"> Товар добавлен в корзину </div>
            <div v-show="productAddSending"> Товар добавляется </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br>
            Синхронизация со смартфоном<br>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br>
            Поддержка сторонних приложений<br>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет
            оптимизировать свои велотренировки, сделав их максимально эффективными.
            Wahoo ELEMNT BOLT GPS синхронизируется с датчиками по ANT+,
            объединяя полученную с них информацию. Данные отображаются на
            дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные
            приложения сторонних разработчиков. Велокомпьютер точно отслеживает
            местоположение, принимая сигнал с целого комплекса спутников.
            Эта информация позволяет смотреть уже преодоленные маршруты и
            планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный.
            Размеры устройства составляют всего 74,6 x 47,3 x 22,1 мм.
            что не превышает габариты смартфона.
            Корпус гаджета выполнен из черного пластика. На
            обращенной к пользователю стороне расположен дисплей диагональю 56 мм.
            На дисплей выводятся координаты и скорость, а также полученная со
            смартфона и синхронизированных датчиков информация: интенсивность,
            скорость вращения педалей, пульс и т.д. (датчики не входят в
            комплект поставки). Корпус велокомпьютера имеет степень защиты
            от влаги IPX7. Это означает, что устройство не боится пыли,
            а также выдерживает кратковременное (до 30 минут) погружение
            в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import gotoPage from '@/helpers/gotoPage';
import ProductColor from '@/components/ProductColor.vue';
import numberFormat from '@/helpers/numberFormat';
import Quantity from '@/components/Quantity.vue';
import { API_BASE_URL } from '@/config';

export default {
  data() {
    return {
      productAmount: 1,
      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,

      productAdded: false,
      productAddSending: false,
    };
  },
  components: { ProductColor, Quantity },
  computed: {
    product() {
      return this.productsData;
    },
    category() {
      return this.productsData.category;
    },
    colors() {
      return this.productsData.colors;
    },
  },
  methods: {
    ...mapActions(['addProductToCart']),

    gotoPage,
    addToCart() {
      this.productAdded = false;
      this.productAddSending = true;
      this.addProductToCart({ productId: this.product.id, amount: this.productAmount })
        .then(() => {
          this.productAdded = true;
          this.productAddSending = false;
        });
    },
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      this.loadProductsTimer = setTimeout(() => {
        // eslint-disable-next-line no-return-assign
        axios.get(`${API_BASE_URL}/api/products/${this.$route.params.id}`)
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true).then(() => this.productsLoading = false);
      }, 0);
    },
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadProducts();
      },
      immediate: true,
    },
  },
  filters: {
    numberFormat,
  },
};
</script>
