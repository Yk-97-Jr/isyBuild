'use client'

// React Imports
import { useState } from 'react'
import type { ComponentType, MouseEvent, TouchEvent } from 'react'

import Link from 'next/link'

type AddCompanyProps = {
  element: ComponentType<any>
  elementProps?: any
  url?: string // Optional URL prop to navigate onClick
}

const AddCompany = (props: AddCompanyProps) => {
  // Props
  const { element: Element, elementProps, url } = props

  // States
  const [, setOpen] = useState(false)

  // Extract onClick from elementProps
  const { onClick: elementOnClick, ...restElementProps } = elementProps

  // Handle onClick event
  const handleOnClick = (e: MouseEvent | TouchEvent) => {
    // Call the element's onClick if it exists
    if (elementOnClick) {
      elementOnClick(e)
    }

    // Open state (if needed)
    setOpen(true)
  }

  return (
    <>
      {url ? (
        <Link href={url} passHref>
          <Element onClick={handleOnClick} {...restElementProps} />
        </Link>
      ) : (
        <Element onClick={handleOnClick} {...restElementProps} />
      )}
    </>
  )
}

export default AddCompany
