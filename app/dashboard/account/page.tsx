'use client'
import { WalletAddress, WalletBalance, WalletNonce, trimFormattedBalance, truncateAddress } from '@turbo-eth/core-wagmi'
import { motion } from 'framer-motion'
import { BranchIsWalletConnected } from '@/components/shared/branch-is-wallet-connected'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { useWalletClient, usePublicClient, useAccount, useNetwork } from 'wagmi'
import { formatEther } from 'viem'
import { useEffect, useState, useMemo, useCallback } from 'react'
import Image from 'next/image'

interface addressType {
  orginAddress: string | undefined
  address: string | undefined
  balance: string
}

export default function PageDashboardAccount() {
  const { address: currentAddress } = useAccount()
  const { chain } = useNetwork()
  // @ts-ignore
  const iconUrl = chain?.iconUrl || ''
  console.log('chain', chain)
  const { data: client, isError, isLoading } = useWalletClient()
  const publicClient = usePublicClient()
  const [addressList, setAddressList] = useState<addressType[]>([])
  const [balanceCount, setBalanceCount] = useState<number>(0)

  // console.log(isError, isLoading)
  const getAddress = async () => {
    if (client) {
      const addressList = await client.requestAddresses()
      // const ensName =
      //   currentAddress &&
      //   (await publicClient.getEnsName({
      //     address: currentAddress,
      // }))
      const balancePromises = addressList.map(async (addr) => {
        const balance = await publicClient.getBalance({
          address: addr,
        })
        return {
          orginAddress: addr,
          address: truncateAddress(addr),
          balance: trimFormattedBalance(formatEther(balance)),
        }
      })
      const updatedAddressList = await Promise.all(balancePromises)
      setAddressList(updatedAddressList)
      setBalanceCount(updatedAddressList.map((addr) => Number(addr.balance)).reduce((pre, cur) => pre + cur, 0))
    }
  }
  useEffect(() => {
    getAddress()
  }, [isLoading])

  const isCurrentAccount = useCallback(
    (addr?: string) => {
      console.log(addr, currentAddress)
      if (addr === currentAddress) {
        return <span className="text-blue-700">(current)</span>
      }
    },
    [currentAddress]
  )

  return (
    <>
      <motion.div
        className="p-6 h-full w-full"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}>
        {addressList.length == 0 ? (
          <h3 className="text-lg font-normal">Connect Wallet to view your personalized dashboard.</h3>
        ) : (
          <>
            <div className="mb-6 text-lg font-bold">
              <Image src={iconUrl} width={30} height={30} alt="" style={{ display: 'inline', marginRight: '5px' }} />
              <span>{chain?.name}</span>
            </div>
            <div className="mb-6 text-lg font-bold">
              <span> Balance Count: {balanceCount}</span>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {addressList.map((addr) => {
                return (
                  <div className="card col-span-4" key={addr.address}>
                    <h3 className="text-2xl font-normal">Account {isCurrentAccount(addr.orginAddress)}</h3>
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
            </div>
          </>
        )}
      </motion.div>
    </>
  )
}
