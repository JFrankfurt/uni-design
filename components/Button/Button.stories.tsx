import { css } from '@emotion/react'
import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import Component, { ButtonProps, ButtonType } from './Button'

export default {
  title: 'components/Button/Button',
  component: Component,
  argTypes: {
    disabled: { control: { type: 'boolean' } },
    onClick: { action: 'clicked' },
    variant: {
      control: {
        type: 'select',
        options: Object.values(ButtonType),
      },
    },
  },
  args: {
    children: '🦄 🦄 🦄 🦄',
  },
}

const Template: Story<ButtonProps> = (args) => (
  <Component {...args}>{args.children}</Component>
)

const decoratorCss = css`
  & > * {
    font-size: 2.5em;
  }
`

export const Button = Template.bind({})
Button.args = { variant: ButtonType.PRIMARY }
Button.decorators = [
  (Story: any) => (
    <div css={decoratorCss}>
      <Story />
    </div>
  ),
]
