import Vue from 'vue'
import { configure } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

require('@/assets/stylesheets/base.scss')

Vue.component('nuxt-link', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<a href="#" @click.prevent="log()"><slot>NuxtLink</slot></a>'
})

Vue.component('svg-icon', {
  props: [],
  template: '<span>svg-icon</span>'
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module)
