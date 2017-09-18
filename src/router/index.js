import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Home from '@/components/Home'
import AccountCreated from '@/components/AccountCreated'
import QuipSolve from '@/components/quip/QuipSolve'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }, {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/account-created',
      name: 'AccountCreated',
      component: AccountCreated
    }, {
      path: '/quips/:id',
      name: 'QuipSolve',
      component: QuipSolve
    }
  ]
})
