import { css } from '@emotion/react'
import Button from 'components/Button/Button'
import { useState } from 'react'

const testCss = css`
  font-size: 3em;
`

export default function Home() {
  const [test, setTest] = useState('test')
  function handleClick() {
    if (test === 'test') {
      setTest('🦄 🦄 🦄 🦄')
    } else {
      setTest('test')
    }
  }
  return (
    <div>
      <Button css={testCss} onClick={handleClick}>
        {test}
      </Button>
    </div>
  )
}
