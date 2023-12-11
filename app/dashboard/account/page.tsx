'use client'
import { WalletAddress, WalletBalance, WalletNonce, trimFormattedBalance, truncateAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'

import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { useWalletClient, usePublicClient } from 'wagmi'
import { formatEther } from 'viem'
import { useEffect, useState } from 'react'

interface addressType {
  address: string | undefined
  balance: string
}

export default function PageDashboardAccount() {
  const { data: client, isError, isLoading } = useWalletClient()
  const publicClient = usePublicClient()
  const [addressList, setAddressList] = useState<addressType[]>([])

  const getAddress = async () => {
    if (client) {
      let list: addressType[] = []
      const address = await client.requestAddresses()
      for (const addr of address) {
        const balance = await publicClient.getBalance({
          address: addr,
        })
        list.push({
          address: truncateAddress(addr),
          balance: trimFormattedBalance(formatEther(balance)),
        })
      }
      setAddressList(list)
    }
  }
  useEffect(() => {
    getAddress()
  })

  return (
    <>
      <motion.div
        className="flex-center flex h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        <BranchIsWalletConnected>
          <>
            {addressList.map((addr) => {
              return (
                <div className="card w-[300px] mr-4">
                  <h3 className="text-2xl font-normal">Account</h3>
                  <hr className="my-3 dark:opacity-30" />
                  <div className="mt-3">
                    <span className="mr-1 font-bold">Address:</span> {addr.address}
                  </div>
                  <div className="mt-3">
                    <span className="mr-1 font-bold">Balance:</span> {addr.balance}
                  </div>
                  <div className="mt-3">
                    <span className="mr-1 font-bold">Nonce:</span> <WalletNonce />
                  </div>
                  <hr className="my-3 dark:opacity-30" />
                </div>
              )
            })}
          </>
          <h3 className="text-lg font-normal">Connect Wallet to view your personalized dashboard.</h3>
        </BranchIsWalletConnected>
      </motion.div>
    </>
  )
}
