import React from 'react'

import ProjectInformation from '@/views/projects/ProjectInformation'
import Location from '@/views/projects/Location'


function page() {
  //ProjectInformation State
  return (
    <div className=''>
      <div className='flex sm:flex-row  flex-col gap-2'>
        <div className='w-3/2'>
          <ProjectInformation />
        </div>
        <div>
          <Location />
        </div>
      </div>
    </div>
  )
}

export default page
