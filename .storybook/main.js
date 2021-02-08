const { resolve } = require('path')
module.exports = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
      require.resolve('@emotion/babel-preset-css-prop'),
    ]
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          ['react-app', { flow: false, typescript: true }],
          require.resolve('@emotion/babel-preset-css-prop'),
        ],
      },
    })

    config.resolve.extensions.push('.ts', '.tsx')

    config.resolve.modules = [...(config.resolve.modules || []), resolve('./')]
    return config
  },
}
