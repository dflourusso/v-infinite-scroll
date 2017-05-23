<template lang="pug">
div(style="text-align: center;")
  h2 Move the scroll up and down do load next or previous pages
  infinite-scroll.infinite-scroll(:loading='loading', @top='prevPage', @bottom='nextPage', :offset='0')
    div(v-for='item in items')
      p.id {{item.id}}
      p.description {{item.description}}
    h1.loading-icon(v-if='loading') &#x21bb;
</template>

<script>
import InfiniteScroll from '../src/InfiniteScroll.vue'
export default {
  name: 'demo',
  components: { InfiniteScroll },
  data () {
    return {
      loremConstant: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      page: 1,
      items: [],
      loading: false
    }
  },
  methods: {
    prevPage () {
      if (this.page == 1) return
      --this.page
      this.api(this.page)
    },
    nextPage () {
      ++this.page
      this.api(this.page)
    },
    api (page = 1, limit = 20) {
      this.loading = true
      --page
      if (page <= 0) page = 0
      this.items = []
      setTimeout(() => {
        let items = []
        let offset = page * limit
        for (let i = offset; i < offset+limit; i++) {
          items.push({id: i, description: this.loremConstant})
        }
        this.items = items
        this.loading = false
      }, 1000)

    }
  },
  created () {
    this.api()
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
  color #155b95
  border 1px solid gray
  padding 20px
</style>
