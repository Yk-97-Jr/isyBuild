// React Imports
import type { SVGAttributes } from 'react'

const MessageIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' {...props}>
      <path
        opacity='0.2'
        d='M10 18C10 16.3431 11.3431 15 13 15H51C52.6569 15 54 16.3431 54 18V36C54 37.6569 52.6569 39 51 39H19.8284L12 46.8284V39H13C11.3431 39 10 37.6569 10 36V18Z'
        fill='currentColor'
      />
      <path
        d='M12 46.8284V39H13C11.3431 39 10 37.6569 10 36V18C10 16.3431 11.3431 15 13 15H51C52.6569 15 54 16.3431 54 18V36C54 37.6569 52.6569 39 51 39H19.8284L12 46.8284Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default MessageIcon
