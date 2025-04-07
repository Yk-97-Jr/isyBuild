'use client'

// React Imports
import { useEffect } from 'react'

// Type Imports
import type { SystemMode } from '@core/types'

// Component Imports
import HeroSection from './HeroSection'
import UsefulFeature from './UsefulFeature'
import ContactUs from './ContactUs'
import GetStarted from './GetStarted'
import { useSettings } from '@core/hooks/useSettings'


const LandingPageWrapper = ({ mode }: { mode: SystemMode }) => {
  // Hooks
  const { updatePageSettings } = useSettings()

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: 'default'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='bg-backgroundPaper'>
      <HeroSection mode={mode} />
       <UsefulFeature />
      <GetStarted mode={mode}/>
      <ContactUs  />
    </div>
  )
}

export default LandingPageWrapper
