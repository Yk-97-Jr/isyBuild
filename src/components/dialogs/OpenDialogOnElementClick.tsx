"use client"

import { useState } from 'react'

import type { ComponentType } from 'react'

import { useRouter } from 'next/navigation'

type OpenDialogOnElementClickProps = {
  element: ComponentType<any>
  dialog: ComponentType<any>
  elementProps?: any
  dialogProps?: any
  redirectTo?: string // Add a redirectTo prop to specify the new page to push to
}

const OpenDialogOnElementClick = (props: OpenDialogOnElementClickProps) => {
  const { element: Element, dialog: Dialog, elementProps, dialogProps, redirectTo } = props

  // States
  const [open, setOpen] = useState(false)
  const router = useRouter() // Use Next.js useRouter hook for navigation

  // Extract onClick from elementProps
  const { onClick: elementOnClick, ...restElementProps } = elementProps

  // Handle onClick event
  const handleOnClick = (e: MouseEvent) => {
    elementOnClick && elementOnClick(e)

    if (redirectTo) {
      // If a redirectTo path is provided, push to that page
      router.push(redirectTo)
    } else {
      // Otherwise, open the dialog
      setOpen(true)
      dialogProps.setAddValue(true)
    }
  }

  return (
    <>
      {/* Render element and pass onClick event */}
      <Element onClick={handleOnClick} {...restElementProps} />

      {/* Render dialog if no redirectTo is provided */}
      {!redirectTo && (
        <Dialog open={open} setOpen={setOpen} {...dialogProps} />
      )}
    </>
  )
}

export default OpenDialogOnElementClick
