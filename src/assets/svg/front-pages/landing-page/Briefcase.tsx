import type { SVGAttributes } from 'react'

const Briefcase = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64' fill='none' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20 8C18.8954 8 18 8.89543 18 10V12H46V10C46 8.89543 45.1046 8 44 8H20ZM16 12V10C16 7.79086 17.7909 6 20 6H44C46.2091 6 48 7.79086 48 10V12H52C54.2091 12 56 13.7909 56 16V52C56 54.2091 54.2091 56 52 56H12C9.79086 56 8 54.2091 8 52V16C8 13.7909 9.79086 12 12 12H16ZM50 20H14V50H50V20ZM30 28C30 27.4477 30.4477 27 31 27H33C33.5523 27 34 27.4477 34 28V30H50V20H14V30H30V28Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Briefcase
