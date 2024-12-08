/**
 * @description sequelize 实例
 * @author STEPHEN
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isProd, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF
const conf = {
    host,
    // 方言 指定使用的数据库类型
    dialect: 'mysql',
}

if (isTest) {
    conf.logging = () => {}
}

// 线上环境，使用连接池, 来解决性能问题。
if (isProd) {
    conf.pool = {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小
        idle: 10000  // 如果一个连接池 10 s 之内没有被使用，则释放
    }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
