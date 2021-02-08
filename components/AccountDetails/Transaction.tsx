import styled from '@emotion/styled'
import Link from 'components/Link/Link'
import { useActiveWeb3React } from 'hooks'
import React from 'react'

const TransactionWrapper = styled.div`
  display: flex;
`

const TransactionStatusText = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  :hover {
    text-decoration: underline;
  }
`

const TransactionState = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none !important;
  border-radius: 0.5rem;
  padding: 0.25rem 0rem;
  font-weight: 500;
  font-size: 0.825rem;
  color: ${({ theme }) => theme.primary1};
`

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.red1};
`

export default function Transaction({ hash }: { hash: string }) {
  const { chainId } = useActiveWeb3React()

  if (!chainId) return null

  return (
    <TransactionWrapper>
      <TransactionState href={''}>
        <TransactionStatusText> ↗</TransactionStatusText>
        <IconWrapper>{hash}</IconWrapper>
      </TransactionState>
    </TransactionWrapper>
  )
}
