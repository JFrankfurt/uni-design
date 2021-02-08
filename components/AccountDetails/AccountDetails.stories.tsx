import { css } from '@emotion/react'
import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import Component from './AccountDetails'
import { withWeb3 } from '.storybook/preview'

export default {
  title: 'components/AccountDetails/AccountDetails',
  component: Component,
  argTypes: {},
  args: {
    pendingTransactions: [
      '0xd9562e5d8582e4126d198f0bc6e08b7727ce8dce224d15dc24aa268eb077a416',
    ],
    confirmedTransactions: [
      '0x27660773e72bacbfd9d2ed23643d981827b589df4358a4336434389bc20f1cdf',
    ],
    ENSName: undefined,
    openOptions: console.log,
    children: '🦄 🦄 🦄 🦄',
  },
}

const Template: Story<any> = (args) => (
  <Component {...args}>{args.children}</Component>
)

const decoratorCss = css`
  margin: 1em 2em;
  & > * {
    font-size: 2.5em;
  }
`

export const AccountDetails = Template.bind({})
AccountDetails.decorators = [
  (Story: any) => (
    <div css={decoratorCss}>
      <Story />
    </div>
  ),
  withWeb3,
]
