import Link from 'next/link'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { FaCopy, FaPaperPlane } from 'react-icons/fa'

interface DialogSendProps {
  address: string
}

export function DialogSend({ address }: DialogSendProps) {
  const onSend = useCallback(() => {}, [])

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span
                onClick={onSend}
                className="ml-auto flex-center flex h-7 w-7 cursor-pointer rounded-md bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 hover:dark:bg-neutral-900">
                <FaPaperPlane className="text-neutral-600 dark:text-neutral-100" />
              </span>
            </TooltipTrigger>
            <TooltipContent>Send</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-y-4 text-center">
          <span className="text-xl font-bold">You are about to stop your Livestream</span>
          <div className="flex w-full justify-center gap-x-4">
            <AlertDialogAction>
              <Link href={`/integration/livepeer/livestream/`} className="">
                <span>Stop Livestream</span>
              </Link>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
