<template>
  <div class="cq-screen-sign-up">
    <form name="signUpForm" class="pure-form pure-form-stacked cq-sign-up-form">
      <fieldset class="pure-group">
        <input class="pure-input-1" v-model="username" placeholder="Username" required />
        <input class="pure-input-1" v-model="email" placeholder="Email" type="email" required />
        <input class="pure-input-1" v-model="password" type="password" placeholder="Password" required minlength="8" />
        <input class="pure-input-1" v-model="repeatPassword" type="password" placeholder=" Repeat Password" required minlength="8" />

        <button class="pure-button pure-button-primary" type="button" v-on:click="signUp()" ng-disabled="disableSignUp || !signUpForm.$valid">Sign Up</button>
      </fieldset>
    </form>

    <vue-toast ref="toast"></vue-toast>
  </div>
</template>
<script>
import axios from 'axios'
import VueToast from 'vue-toast'
export default {
  name: 'signUp',
  components: { 'vue-toast': VueToast },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
  },
  methods: {
    signUp () {
      axios.post('/account/create', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then((response) => {
        this.$router.push('/account-created')
      }).catch((error) => {
        this.$refs.toast.showToast(error.response.data.message, { timeLife: 3000, theme: 'error' })
      })
    }
  }
}
</script>
<style scope lang="scss">
.cq-screen-sign-up {
  .cq-sign-up-form {
    width: 250px;
    margin: 0 auto;

    button {
      float: right;
    }
  }
}
</style>
