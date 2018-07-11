/*
接口请求参数模块
函数的返回值promise对象
 */
import ajax from './ajax'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = geohash => ajax(`/api/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodTypes = () => ajax('/api/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (keyword, geohash) => ajax('/api/search_shops', {keyword, geohash})

/**
 * 账号密码登录
 */
export const reqPwdLogin = (name, pwd, captcha) => ajax('/api/login_pwd', {
  name,
  pwd,
  captcha
}, 'POST')

/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax('/api/sendcode', {phone})

/**
 * 手机号验证码登录
 */
export const reqSmsLogin = (phone, code) => ajax('/api/login_sms', {phone, code}, 'POST')

/**
 * 获取用户信息(根据会话)
 */
export const reqUser = () => ajax('/api/userinfo')

//退出登陆
export const reqLogout=()=>ajax('/api/')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/shop_info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/shop_ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/shop_goods')
