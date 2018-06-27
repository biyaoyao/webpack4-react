// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    commonjs: true,
    browser: true,
  },
  globals: {
    require: true,
    define: true,
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    // https://github.com/feross/eslint-config-standard-react
    'standard-react'
  ],
  // https://github.com/yannickcr/eslint-plugin-react
  plugins: [
    'react',
    'babel',
    'promise'
  ],
  rules: { //0 关闭，1 警告，2 错误
    'no-class-assign': 0,
    'react/jsx-no-undef ': 0,
    'new-cap': 0,
    'block-scoped-var': 0,                                     //把 var 语句看作是在块级作用域范围之内
    'comma-dangle': 0,                                         // 不对数组或对象末尾逗号做强制要求
    'curly': 1,                                                //语句强制分号结尾//为所有控制语句指定花括号约定，警告
    "semi": [2, "always"],                                     //强制分号
    'eol-last': 0,                                             //强制文件最后一行为空行，关闭
    'eqeqeq': [1, 'allow-null'],                               //要求使用 === 和 !==，但允许 == null
    'dot-notation': 0,                                         //尽可能的使用点符号
    'no-useless-escape': 0,
    'camelcase': 0,
    'no-console': 0,                                           //不允许存在 console。关闭
    'spaced-comment': 0,
    'no-empty': 1,                                             //空的代码块
    'no-multi-spaces': 1,                                      //不允许多个空格
    "space-before-function-paren": 0,
    'no-self-compare': 1,                                      //禁止自身比较
    'react/prop-types': 0,
    "react/jsx-indent": 0,
    "react/jsx-indent-props": 0,
    "react/jsx-tag-spacing": 0,
    "jsx-indent": 0,
    "react/jsx-no-bind": 0,
    "indent": 0,//缩进风格
    'no-shadow': 0,                                            //不允许声明在外层作用域下已声明过的变量
    'no-undef': 2,                                             //不允许使用未申明变量
    "no-empty-label": 0,                                       //允许空标签
    'no-underscore-dangle': 0,
    "react/self-closing-comp": 0,                              //禁止标识符中有悬空下划线。关闭
    'no-unused-expressions': 0, // 禁止在语句的位置使用表达式，但允许a && a()
    'no-unused-vars': [2, {'vars': 'all', 'args': 'none'}],  //变量定义后未使用
    'no-use-before-define': 2,                                 //不允许在变量定义之前使用它们
    'quotes': [0, 'single', 'avoid-escape']                   //使用单引号，除非为了避免转义
  }
};
