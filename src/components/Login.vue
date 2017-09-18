<template>
  <div>
    <form name="loginForm" class="pure-form pure-form-stacked cq-form cq-login-form">
      <fieldset>
        <input class="pure-input-1" v-model="username" placeholder="Username" autocapitalize="off" v-validate="'required'" />
        <input class="pure-input-1" v-model="password" type="password" placeholder="Password" v-validate="'required|min:8'" />

        <button class="pure-button pure-button-primary" type="button" v-on:click="login" :disabled="errors.any()">Login</button>
        <router-link class="cq-sign-up" to="sign-up">Sign Up!</router-link>
      </fieldset>
    </form>

    <vue-toast ref="toast"></vue-toast>
  </div>
</template>

<script>
import axios from 'axios'
import VueToast from 'vue-toast'
export default {
  name: 'login',
  components: { 'vue-toast': VueToast },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('/account/login', {
        username: this.username,
        password: this.password
      }).then((response) => {
        sessionStorage.setItem('x-access-token', response.data.token)
        axios.defaults.headers.common['x-access-token'] = response.data.token
        this.$router.push('home')
      }).catch((error) => {
        this.$refs.toast.showToast(error.response.data.message, { timeLife: 3000, theme: 'error' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.cq-login-form {
  width: 250px;
  margin: 0 auto;

  button {
    float: right;
  }
  .cq-sign-up {
    float: right;
    font-size: 12px;
    line-height: 30px;
      padding-right: 11px;
  }
}
</style>
