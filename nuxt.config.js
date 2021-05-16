require('dotenv').config();

const config = {
  'app-host': process.env.NUXT_ENV_APP_HOST,
  'app-port': process.env.NUXT_ENV_APP_PORT,

  'app-protocol': process.env.NUXT_ENV_APP_PROTOCOL,
  'app-domain': process.env.NUXT_ENV_APP_DOMAIN,

  'api-protocol': process.env.NUXT_ENV_API_PROTOCOL,
  'api-domain': process.env.NUXT_ENV_API_DOMAIN,
};

Object.assign(config, {
  'app-path': `${config['app-protocol']}://${config['app-domain']}`,
  'api-path': `${config['api-protocol']}://${config['api-domain']}`,
});

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  server: {
    port: config['app-port'] || 3000,
    host: config['app-host'] || '0.0.0.0',
  },

  env: {
    'app-path': config['app-path'],
    'api-path': config['api-path'],
  },

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'KonkursDoc',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        name: 'msapplication-TileColor',
        content: '#fcfcfc',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon/favicon-16x16.png',
      },
      {
        rel: 'manifest',
        href: '/favicon/site.webmanifest',
      },
      {
        rel: 'mask-icon',
        href: '/favicon/safari-pinned-tab.svg',
        color: '#eb8526',
      },
    ],
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/scss/app.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */

  serverMiddleware: [
    // Will register file from project api directory to handle /api/* requires
    { path: '/projects', handler: '~/api/projects.js' },
  ],

  plugins: [
    { src: '~/plugins/auth.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/modal.js' },
    { src: '~/plugins/vue-select.js' },
    { src: '~/plugins/v-virtual-scroll.js' },
    { src: '~/plugins/jodit-vue.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Nuxt.js Bootstrap Vue
   */
  bootstrapVue: {
    // https://bootstrap-vue.js.org/docs#using-custom-bootstrap-scss
    bootstrapVueCSS: false,
    bootstrapCSS: false,
    icons: false,
    config: {
      breakpoints: ['xs', 'sm', 'lg', 'xl', 'xxl'],
    },
    componentPlugins: [
      'ButtonPlugin',
      'CollapsePlugin',
      'EmbedPlugin',
      'FormPlugin',
      'FormGroupPlugin',
      'FormInputPlugin',
      'FormSelectPlugin',
      'FormCheckboxPlugin',
      'InputGroupPlugin',
      'ModalPlugin',
      'TablePlugin',
      'TabsPlugin',
      'CardPlugin',
      'TooltipPlugin',
      'PopoverPlugin',
      'ToastPlugin',
    ],
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: config['api-path'],
    headers: {
      post: {
        'Content-Type': 'application/json',
      },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    loaders: {
      cssModules: {
        modules: {
          localIdentName:
            process.env.NODE_ENV === 'production'
              ? '[hash:base64:4]'
              : '[local]__[hash:base64:4]',
        },
      },
    },

    extractCSS: true,

    babel: {
      compact: true,
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
