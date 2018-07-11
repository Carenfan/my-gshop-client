import Mock from 'mockjs'
import apiData from './data.json'

Mock.mock('/seller', {code:0, data:apiData.seller})
Mock.mock('/goods', {code:0, data:apiData.goods})
Mock.mock('/ratings', {code:0, data:apiData.ratings})
