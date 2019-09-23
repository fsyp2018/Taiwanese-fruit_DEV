import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/',
          name: 'Carousel',
          component: () => import('./components/Carousel.vue')
        },
        {
          path: 'orderform',
          name: 'OrderForm',
          component: () => import('./components/OrderForm.vue')
        },
        {
          path: 'ordercheckout/:orderId',
          name: 'OrderCheckout',
          component: () => import('./components/OrderCheckout.vue')
        },
        {
          path: 'PurchaseItem',
          name: 'PurchaseItem',
          component: () => import('./components/PurchaseItem.vue')
        },
        {
          path: 'Transport',
          name: 'Transport',
          component: () => import('./components/Transport.vue')
        },
        {
          path: 'Lottery',
          name: 'Lottery',
          component: () => import('./components/Lottery.vue')
        },
        {
          path: 'ProductDetails/:id',
          name: 'ProductDetails',
          component: () => import('./components/ProductDetails.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('./components/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orderlist',
          name: 'Orderlist',
          component: () => import('./components/OrderList.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('./components/Coupon.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
