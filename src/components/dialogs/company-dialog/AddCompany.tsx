'use client'

// React Imports
import { useState } from 'react'
import type { ComponentType } from 'react'

type AddCompanyProps = {
  element: ComponentType<any>
  elementProps?: any
}

const AddCompany = (props: AddCompanyProps) => {
  // Props
  const { element: Element, elementProps } = props

  // States
  const [, setOpen] = useState(false)

  // Extract onClick from elementProps
  const { onClick: elementOnClick, ...restElementProps } = elementProps

  // Handle onClick event
  const handleOnClick = (e: MouseEvent) => {
    elementOnClick && elementOnClick(e)
    setOpen(true)
  }

  return (
    <>
      {/* Receive element component as prop and we will pass onclick event which changes state to open */}
      <Element onClick={handleOnClick} {...restElementProps} />
    </>
  )
}

export default AddCompany
