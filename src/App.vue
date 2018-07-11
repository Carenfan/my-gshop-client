<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.isShow"/>
  </div>
</template>

<script>
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {

    mounted () {
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getUser')
    },
    created () {
        // 异步获取address
        this.$store.dispatch('getAddress')
      // 异步获取登陆用户信息
        this.$store.dispatch('getUserInfo')
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
