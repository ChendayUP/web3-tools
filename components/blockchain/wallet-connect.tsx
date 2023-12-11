'use client'
import * as React from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'

interface WalletConnectProps {
  className?: string
}

export const WalletConnect = ({ className }: WalletConnectProps) => {
  return (
    <span className={className}>
      <ConnectButton
        showBalance={true}
        accountStatus={{
          smallScreen: 'address',
          largeScreen: 'address',
        }}
        chainStatus={{
          smallScreen: 'icon',
          largeScreen: 'icon',
        }}
      />
    </span>
  )
}
