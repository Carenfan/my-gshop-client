<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>

      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="imgBaseUrl+ c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {

    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com'
      }
    },

    mounted () {
      this.$store.dispatch('getCategorys')
      this.$store.dispatch('getShops')
    },

    computed: {
      ...mapState(['address', 'categorys']),

      categorysArr () {
        const {categorys} = this
        const arr = []
        let smallArr = []
        categorys.forEach(c => {
          // 将全新的小数组保存到大数组中
          if(smallArr.length===0) {
            arr.push(smallArr)
          }

          // 将当前分类保存到小数组
          smallArr.push(c)

          // 如果刚好满了, 为后面创建一个新的小数组
          if(smallArr.length===8) {
            smallArr = []
          }
        })
        return arr
      }
    },

    watch: {
      // 更新状态数据后, 界面会异步更新
      categorys (val) { // 状态数据改变了, 但界面还没有更新
        /*setTimeout(() => {
          new Swiper('.swiper-container', {
            pagination: { // 圆点指示器的容器div
              el: '.swiper-pagination'
            },
            loop: true, // 可以循环轮播
          })
        }, 100)*/
        // 回调是在当前数据变化的DOM更新之后自动调用
        this.$nextTick(function () {
          new Swiper('.swiper-container', {
            pagination: { // 圆点指示器的容器div
              el: '.swiper-pagination'
            },
            loop: true, // 可以循环轮播
          })
        })
      }
    },
    components: {
      HeaderTop,
      ShopList
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .msite  //首页
    width 100%

    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
