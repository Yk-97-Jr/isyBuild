// React Imports
import type { SVGAttributes } from 'react'

const Bank = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' {...props}>
      <path
        opacity='0.2'
        d='M32 10L12 22V24H52V22L32 10Z'
        fill='currentColor'
      />
      <path
        d='M32 10L12 22V24H52V22L32 10Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 28H14V36H10V28ZM24 28H28V36H24V28ZM34 28H38V36H34V28ZM46 28H50V36H46V28Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10 36H54V44H10V36Z'
        fill='currentColor'
      />
      <path
        d='M4 50V38H60V50H62V52H56V58H52V52H12V58H8V52H2V50H4ZM54 50V40H10V50H54Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Bank
