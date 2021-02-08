import { css, useTheme } from '@emotion/react'

const linkCss = (theme) => css`
  text-decoration: none;
  cursor: pointer;
  color: ${theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const Link = ({ children, ...rest }) => {
  const theme = useTheme()
  return (
    <a css={linkCss(theme)} {...rest}>
      {children}
    </a>
  )
}

export default Link
