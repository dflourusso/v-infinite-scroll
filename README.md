# v-infinite-scroll

> Bidirectional infinite-scroll component for Vue.js

Installation
------------

### Using yarn

`yarn add v-infinite-scroll`

### Using npm

`npm i --save v-infinite-scroll`

Demo
----

[DEMO](http://dflourusso.github.io/v-infinite-scroll)

Usage
-----

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'

import InfiniteScroll from 'v-infinite-scroll'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-infinite-scroll/dist/v-infinite-scroll.css'

Vue.use(InfiniteScroll)
```

### Browser

```html
<!-- Include after Vue -->
<link rel="stylesheet" href="v-infinite-scroll/dist/v-infinite-scroll.css"></link>
<script src="v-infinite-scroll/dist/v-infinite-scroll.js"></script>
<script>
  Vue.use(InfiniteScroll)
</script>
```

### Example

```html
<template>
  <v-infinite-scroll :loading="loading" @top="prevPage" @bottom="nextPage" :offset='20' style="max-height: 80vh; overflow-y: scroll;">
    <div v-for="item in items">{{item}}</div> // Your content
  </v-infinite-scroll>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      items: [],
      loading: false
    }
  },
  methods: {
    prevPage () {
      if (this.page == 1) return
      --this.page
      this.api()
    },
    nextPage () {
      ++this.page
      this.api()
    },
    api () {
      this.loading = true
      myApi.get({page: this.page}).then((response) => {
        this.items = response
        this.loading = false
      })
    }
  }
}
</script>
```

Properties
----------

| Name                     | Type    | Required | Default value | Info                                                |
|--------------------------|---------|----------|---------------|-----------------------------------------------------|
| **loading**              | Boolean | No       |               | Must be true if data is being loaded                |
| **offset**               | Number  | No       | 0             | Distance of top or bottom to emit the events        |
| **onTopScrollsToBottom** | Boolean | No       | True          | When using bidirectional scroll, automatically scrolls to the bottom after load a previous page |


Events
----------

| Name              | Info                                             |
|-------------------|--------------------------------------------------|
| **top**           | Triggered after the scroll arrives at the top    |
| **bottom**        | Triggered after the scroll arrives at the bottom |


Author
-------

[Daniel Fernando Lourusso](http://dflourusso.com.br)

License
-------

This project is licensed under [MIT License](http://en.wikipedia.org/wiki/MIT_License)
