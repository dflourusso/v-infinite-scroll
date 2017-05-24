<template lang="pug">
div(style="text-align: center;")
  div(style="text-align: left;")
    input(type="radio" id="one", :value="true" v-model="showNormal")
    label(for="one") &nbsp;Normal Scroll
    br
    input(type="radio" id="two", :value="false" v-model="showNormal")
    label(for="two") &nbsp;Bidirectional Scroll
  div(v-if='showNormal')
    h2 Move the scroll down do load next pages
    infinite-scroll.infinite-scroll(:loading='loading2', @bottom='nextPage2', :offset='300')
      div(v-for='item in items2')
        p.id {{item.id}}
        p.description {{item.description}}
      h1.loading-icon(v-if='loading2') &#x21bb;
  div(v-else)
    h2 Move the scroll up and down do load next or previous pages
    infinite-scroll.infinite-scroll(:loading='loading1', @top='prevPage1', @bottom='nextPage1', :offset='10')
      div(v-for='item in items1')
        p.id {{item.id}}
        p.description {{item.description}}
      h1.loading-icon(v-if='loading1') &#x21bb;

</template>

<script>
import InfiniteScroll from '../src/InfiniteScroll.vue'
export default {
  name: 'demo',
  components: { InfiniteScroll },
  data () {
    return {
      loremConstant: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      showNormal: true,
      page1: 1,
      items1: [],
      loading1: false,
      page2: 1,
      items2: [],
      loading2: false
    }
  },
  methods: {
    prevPage1 () {
      if (this.page1 == 1) return
      --this.page1
      this.api1(this.page1)
    },
    nextPage1 () {
      ++this.page1
      this.api1(this.page1)
    },
    api1 (page = 1, limit = 20) {
      this.loading1 = true
      --page
      if (page <= 0) page = 0
      this.items1 = []
      setTimeout(() => {
        let items = []
        let offset = page * limit
        for (let i = offset; i < offset+limit; i++) {
          items.push({id: i, description: this.loremConstant})
        }
        this.items1 = items
        this.loading1 = false
      }, 1000)

    },
    nextPage2 () {
      ++this.page2
      this.api2(this.page2)
    },
    api2 (page = 1, limit = 20) {
      this.loading2 = true
      --page
      if (page <= 0) page = 0
      setTimeout(() => {
        let items = []
        let offset = page * limit
        for (let i = offset; i < offset+limit; i++) {
          items.push({id: i, description: this.loremConstant})
        }
        this.items2 = this.items2.concat(items)
        this.loading2 = false
      }, 500)

    }
  },
  created () {
    this.api1()
    this.api2()
  },
  watch: {
    showNormal () {
      if (this.showNormal) {
        this.items2 = []
        this.api2()
      } else {
        this.api1(1)
      }
    }
  }
}
</script>

<style src="./style.css"></style>
<style lang="stylus">
.loading-icon
  display inline-block
  animation fa-spin 1s infinite linear
  font-size 60px
@keyframes fa-spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(359deg)
p.id
  font-size 2em
p.description
  font-size 1.2em
.infinite-scroll
  max-height 400px
  overflow-y scroll
  -webkit-overflow-scrolling touch
  overflow-scrolling touch
  color #155b95
  border 1px solid gray
  padding 20px
</style>
