import { create } from '@storybook/theming'

// this themes the storybook UI
const uniswapBaseTheme = {
  brandTitle: 'Uniswap Design',
  brandUrl: 'https://uniswap.org',
  brandImage: 'https://placehold.it/350x150',
}
export const light = create({
  base: 'light',
  ...uniswapBaseTheme,
})

// export const dark = create({
//   base: 'dark',
//   ...uniswapBaseTheme,
// })
