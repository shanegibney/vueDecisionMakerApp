import Vue from 'vue'
import Router from 'vue-router'
import Decision from '@/components/Decision'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Decision',
    component: Decision
  }]
})