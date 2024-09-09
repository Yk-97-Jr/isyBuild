// React Imports
import type { SVGAttributes } from 'react'

const NotificationIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' {...props}>
      <path
        opacity='0.2'
        d='M32 54C29.7909 54 28 52.2091 28 50H36C36 52.2091 34.2091 54 32 54Z'
        fill='currentColor'
      />
      <path
        d='M32 54C29.7909 54 28 52.2091 28 50H36C36 52.2091 34.2091 54 32 54Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M48 40V26C48 19.3726 44.2614 13.6438 38 12.1424V10C38 8.34315 36.6569 7 35 7H29C27.3431 7 26 8.34315 26 10V12.1424C19.7386 13.6438 16 19.3726 16 26V40L10 46V48H54V46L48 40Z'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default NotificationIcon
