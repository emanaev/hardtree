import Vue from 'vue'
import VueRouter from 'vue-router'
import Random from './Random.vue'
import Typology from './Typology.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/random', component: Random },
  { path: '/scheme/:id', component: Typology, props: true}
]

const router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
})

new Vue({
  router,
  data: () => ({ n: 0 }),
  template: `
    <div id="app">
      <ul>
        <li><router-link to="/random">Иркутская площадка со случайными кластерами</router-link></li>
        <li><router-link to="/scheme/103">Схема #103</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,

  methods: {
    navigateAndIncrement () {
      const increment = () => this.n++
      if (this.$route.path === '/') {
        this.$router.push('/foo', increment)
      } else {
        this.$router.push('/', increment)
      }
    }
  }
}).$mount('#app')