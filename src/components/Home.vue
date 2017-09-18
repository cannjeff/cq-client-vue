<template>
  <div>
    <h2>Quips</h2>
    <table class="pure-table pure-table-striped cq-table">
      <thead>
        <tr>
          <th>Date Added</th>
          <th>Quip</th>
          <th>Solved</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quip in quips">
          <td>{{ quip.formattedCreatedDate }}</td>
          <td>{{ quip.encrypted_text }}</td>
          <td>{{ quip.solved }}</td>
          <td>
            <quip-actions v-bind:quip="quip"></quip-actions>
            <!-- <div class="cq-table-button-wrapper">
              <router-link class=""pure-button pure-button-primary button-small to="quip/{quip._id}">Solve</router-link>
              <button ng-show="editMode" class="pure-button button-secondary button-small" ng-click="updateQuip(quip._id)">Update</button>
              <button ng-show="editMode" class="pure-button button-error button-small" ng-click="deleteQuip(quip._id)">Delete</button>
            </div> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
import QuipActions from './quip/QuipActions'
export default {
  name: 'home',
  components: { QuipActions },
  data () {
    return {
      quips: []
    }
  },
  created () {
    axios.get('/quips')
      .then((response) => {
        this.quips = response.data.data
      })
  },
  methods: {}
}
</script>
<style scope lang="scss">

</style>
