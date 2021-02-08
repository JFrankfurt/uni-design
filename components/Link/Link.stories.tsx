import { css } from '@emotion/react'
import { Story } from '@storybook/react/types-6-0'
import React from 'react'
import Component from './Link'

export default {
  title: 'components/Link/Link',
  component: Component,
  argTypes: {},
  args: {
    children: 'this is a link',
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

export const Link = Template.bind({})
Link.decorators = [
  (Story: any) => (
    <div css={decoratorCss}>
      <Story />
    </div>
  ),
]
