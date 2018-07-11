import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO
} from './mutation-types'
import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUser,
  reqLogout,
  resShopGoods,
  resShopRatings,
  resShopInfo

} from '../api'

export default {
  // 异步获取地址信息的异步action
  async getAddress ({commit, state}) {
    const {latitude, longitude} = state
    const geohash = `${latitude},${longitude}`
    // 发送异步请求, 得到响应数据
    const result = await reqAddress(geohash)  // {code: 0, data: address}
    if(result.code===0) {
      // 提交mutation
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取分类列表的异步action
  async getCategorys ({commit, state}) {
    // 发送异步请求, 得到响应数据
    const result = await reqFoodTypes()  // {code: 0, data: types}
    if(result.code===0) {
      // 提交mutation
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表的异步action
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    // 发送异步请求, 得到响应数据
    const result = await reqShops({latitude, longitude})  // {code: 0, data: shops}
    if(result.code===0) {
      // 提交mutation
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },

  // 同步保存user
  saveUser ({commit}, user) {
    commit(RECEIVE_USER, {user})
  },

  // 异步获取当前用户
  async getUser ({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },

//异步请求退出登陆
    async logout({commit}){
    const result=await reqLogout()
      if(result.code===0){
        commit(RECEIVE_USER)
      }
    },
  // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqShopInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})

      cb && cb()
    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})

      cb && cb()
    }
  },

// 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },
  //记录用户信息
  recordUserInfo({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

// 异步获取用户信息
  async getUserInfo({commit}) {
    const result = await reqUser()
    if(result.code===0) {
      commit(RECEIVE_USER_INFO, {userInfo: result.data})
    }
  }
}
