module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // Ниже перечислены правила, которые пришлось вырубить, потому проект сейчас им несоотвествует. Следует проверить их, останутся ли они с нами. Если нет, то удалить правило и поправить код.
    eqeqeq: 'off', // Использование нестрогого равенства == вместо ===.
    'vue/no-side-effects-in-computed-properties': 'off', // Существует так называемый side effect в вычисляемом свойстве. Это например, когда мы исменяем состояние компонента (this.variable = 'something') при получении вычисляемого свойства. Утверждаетмя, что такие вещи делают код непредсказуемым и трудным для понимания.
    'no-useless-escape': 'off', // Существует необязателььная escape-последовательность. Ее можно убрать.
    'no-prototype-builtins': 'off', // Существуют прямые обращения к прототиптым свойствам через объект. Данное правило утверждает, что намного безопасней вместо такого вызова: foo.hasOwnProperty("bar"), писать такое Object.prototype.hasOwnProperty.call(foo, "bar")
    'no-console': 'off', // Существует обращение к console.log

    // Ниже перечисленные правила, которые линтер хотел пофиксить автоматически. Скорее всего эти правила останутся с нами навсегда
    'vue/name-property-casing': ['error', 'kebab-case'], // Предлагаю name Vue-компонента писать в kebab-case. По умолчанию стоит PascalCase, поэтому задаем это правило руками. В проекте я вижу, что в основном эти имена в кебаб-кейсе, но в файле D:\konkursdoc\frontend\components\layout\default\Header.vue оно задано в Паскаль. Там я оставил коммент, что eslint на него не реагировал.
    'vue/attribute-hyphenation': 'off', // Пропы, передаваемые в Vue-компоненты должны быть по умолчанию написаны через дефис, т.е не showMask, а show-mask. Выключаем это правило.
  },
};
