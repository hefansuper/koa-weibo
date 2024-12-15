/*
 * @Author: stephenHe
 * @Date: 2024-12-15 19:37:40
 * @LastEditors: stephenHe
 * @LastEditTime: 2024-12-15 19:40:06
 * @Description: eslint配置文件
 * @FilePath: /weibo-koa/eslint.config.js
 */
module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], // 需要检查的文件类型
    ignores: ['node_modules', 'test', 'src/public'], // 忽略的文件和目录
    languageOptions: {
      ecmaVersion: 'latest', // 使用最新 ECMAScript 版本
      sourceType: 'module', // 使用模块化代码
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'), // 加载 prettier 插件
    },
    rules: {
      ...require('eslint-config-prettier').rules, // 使用 Prettier 的推荐配置
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
        },
      ],
    },
  },
]
