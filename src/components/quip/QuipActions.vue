<template>
  <div class="cq-table-button-wrapper">
    <button class="pure-button pure-button-primary button-small" to="quip/quip._id" v-on:click="solve">Solve</button>
    <button v-if="editMode" class="pure-button button-secondary button-small" v-on:click="update">Update</button>
    <button v-if="editMode" class="pure-button button-error button-small" v-on:click="remove">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'quip-actions',
  props: ['quip'],
  data () {
    return {
      editMode: true
    }
  },
  methods: {
    solve () {
      this.$router.push(`/quips/${this.quip._id}`)
    },
    update () {

    },
    remove () {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
