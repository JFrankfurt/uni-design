import { css, useTheme } from '@emotion/react'
import { darken } from 'polished'
import * as React from 'react'

const buttonCss = (theme) => css`
  align-items: center;
  background-color: ${theme.primary1};
  border: 1px solid transparent;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  padding: 18px;
  width: '100%';
  font-weight: 500;
  text-align: center;
  outline: none;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }

  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, theme.primary1)};
    background-color: ${darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, theme.primary1)};
    background-color: ${darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${theme.bg3};
    color: ${theme.text3};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`
const buttonOutlineCss = (theme) => css`
  border: 1px solid ${theme.bg2};
  background-color: transparent;
  color: ${theme.text1};

  &:focus {
    box-shadow: 0 0 0 1px ${theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export type ButtonProps = {
  variant?: ButtonType
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export enum ButtonType {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  variant,
  ...rest
}) => {
  const theme = useTheme()

  const styles = [buttonCss(theme)]
  switch (variant) {
    case ButtonType.OUTLINE:
      styles.push(buttonOutlineCss(theme))
      break
  }
  return (
    <button css={styles} {...rest}>
      {children}
    </button>
  )
}

export default Button
