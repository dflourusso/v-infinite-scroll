// need to use require instead of import (changes from babel 5 to 6)
const InfiniteScroll = require('./InfiniteScroll.vue')
InfiniteScroll.install = Vue => Vue.component(InfiniteScroll.name, InfiniteScroll)
InfiniteScroll.version = proccess.env.VERSION

module.exports = InfiniteScroll
