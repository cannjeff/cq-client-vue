<template>
  <div class="cq-screen-quips-solve">
    <h2>Solve</h2>
    <span class="alphabet_legend">
      <span class="pairing" v-for="letter in alphabet" v-bind:class="{ 'pairing-used': isPairingUsed(letter) }">
        <div class="key">{{ letter }}</div>
        <div class="value">{{ valueForLetter(letter) }}</div>
      </span>
    </span>

    <div>
      <button class="pure-button pure-button-primary" v-on:click="undo()" :disabled="dictHistory.length === 1">Undo</button>
      <button class="pure-button button-warning" v-on:click="reset()">Reset</button>
    </div>

    <h3>Hint: {{ quip.hint_key }} => {{ quip.hint_value }}</h3>

    <div class="cq-word-chunk" v-for="word in words">
      <!-- <span class="quip_char_wrapper" v-for="(char, index) in word" v-bind:class="{'punctuation': char.isPunctuation()}">
        <div class="quip_label">{{ char.value }}</div>
        <input class="quip_char" type="text" v-if="char.shouldShowInput()" v-model="keyObject[char.value]" ng-change="updateMap(char.value)" v-bind:class="{ 'value_set': valueSetFor(char.value)}" v-disabled="char.isHint()" ng-blur="blur()" ng-focus="focus(this, $index)" v-bind:data-index="index"/>
        <div v-if="!char.shouldShowInput()">{{ char.value }}</div>
      </span> -->
    </div>

    <div>
      <button class="pure-button pure-button-primary" v-on:click="submitSolution()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import constants from '../../constants'
import _ from 'underscore'
export default {
  name: 'QuipSolve',
  data () {
    return {
      quip: {},
      alphabet: constants.alphabet,
      letterHash: _.object(constants.alphabet),
      dictHistory: [],
      words: []
    }
  },
  created () {
    axios.get(`/quips/${this.$route.params.id}`)
      .then((response) => {
        this.quip = response.data.data
        /* Setting hint key/value */
        this.letterHash[this.quip.hint_key] = this.quip.hint_value
        /* Start letter hash history */
        this.dictHistory.push(_.extend({}, this.letterHash))

        const words = this.quip.encrypted_text.split(' ')
        _(words).each((word, idx, arr) => {
          arr[idx] = _(word.split('')).map(wordToObj)
        })
        this.words = words

        const wordToObj = (letter) => {
          return {
            value: letter,
            shouldShowInput: () => {
              return /^[a-zA-Z]+$/.test(letter)
            },
            isPunctuation: () => {
              return /^[\.,"':;?]$/.test(letter) // eslint-disable-line no-useless-escape
            },
            isHint: () => {
              return letter === this.quip.hintKey
            }
          }
        }
      })
  },
  methods: {
    isPairingUsed (letter) {
      const inverted = _.invert(this.letterHash)
      return inverted[letter] ? inverted[letter].length > 0 : false
    },
    valueForLetter (letter) {
      return _.invert(this.letterHash)[letter]
    },
    undo () {},
    reset () {},
    submitSolution () {}
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variables";
$charWidth: 25px;
.alphabet_legend {
  display: inline-block;
  border: 1px solid black;
  padding: 2px;
  margin-bottom: 10px;

  .pairing {
    display: inline-block;
    vertical-align: top;
    height: 35px;

    &.pairing-used {
      color: lighten($font-color, 75%);
    }
  }
  .key, .value {
    min-width: $charWidth;
    text-align: center;
  }
  .key {
    font-size: 18px;
    font-weight: bold;
  }
  .value {
    font-size: 12px;
  }
}
</style>
