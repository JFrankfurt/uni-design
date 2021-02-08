import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Button from 'components/Button/Button'
import Link from 'components/Link/Link'
import { injected } from 'connectors'
import { SUPPORTED_WALLETS } from 'const'
import { useActiveWeb3React } from 'hooks'
import React from 'react'
import Transaction from './Transaction'

const CloseIcon = styled.div`
  color: ${({ theme }) => theme.text1};
  font-size: 0.8em;
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const Dialogue = styled.div`
  margin: 0px 0px 2rem;
  background-color: ${({ theme }) => theme.bg1};
  box-shadow: rgb(0 0 0 / 5%) 0px 4px 8px 0px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 0px;
  overflow: hidden;
  align-self: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`

const HeaderRow = styled.div`
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primary1};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`

const AccountGroupingRow = styled.div`
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    align-items: center;
  }
`

const AccountSection = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0rem 1rem;
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const LowerSection = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
`

const AccountControl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const AddressLink = styled(Link)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`

const WalletName = styled.div`
  width: initial;
  font-size: 0.825rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text3};
`

const IconWrapper = styled.div<{ size?: number }>`
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const TransactionListWrapper = styled.div``

const WalletAction = styled(Button)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const MainWalletAction = styled(WalletAction)`
  color: ${({ theme }) => theme.primary1};
`

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </TransactionListWrapper>
  )
}

interface AccountDetailsProps {
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0]
    return <WalletName>Connected with {name}</WalletName>
  }

  return (
    <Dialogue>
      <UpperSection>
        <CloseIcon>✕</CloseIcon>
        <HeaderRow>Account</HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {connector !== injected && (
                    <WalletAction
                      style={{
                        fontSize: '.825rem',
                        fontWeight: 400,
                        marginRight: '8px',
                      }}
                      onClick={() => {
                        ;(connector as any).close()
                      }}>
                      Disconnect
                    </WalletAction>
                  )}
                  <WalletAction
                    style={{ fontSize: '.825rem', fontWeight: 400 }}
                    onClick={() => {
                      openOptions()
                    }}>
                    Change
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>
                  {ENSName ? <p> {ENSName}</p> : <p>{account}</p>}
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <AccountControl>
                    <>
                      {account && (
                        <span style={{ marginLeft: '4px' }}>Copy Address</span>
                      )}
                      {chainId && account && (
                        <AddressLink href={''}>
                          <span style={{ marginLeft: '4px' }}>
                            View on Etherscan
                          </span>
                        </AddressLink>
                      )}
                    </>
                  </AccountControl>
                ) : (
                  <AccountControl>
                    <>
                      {account && (
                        <span style={{ marginLeft: '4px' }}>Copy Address</span>
                      )}
                      {chainId && account && (
                        <AddressLink href={''}>
                          <span style={{ marginLeft: '4px' }}>
                            View on Etherscan
                          </span>
                        </AddressLink>
                      )}
                    </>
                  </AccountControl>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>Your transactions will appear here...</LowerSection>
      )}
    </Dialogue>
  )
}
