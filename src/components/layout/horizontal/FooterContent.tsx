'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
 

  return (
    <div
      className={classnames(horizontalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
      
      <span>{`© ${new Date().getFullYear()}, `}</span>
            {/* <span>{`❤️`}</span>
            <span>{` by `}</span> */}
            <Link href='' target='_blank' className='font-medium text-white'>
              isybuild
            </Link>
      </p>
 
    </div>
  )
}

export default FooterContent
