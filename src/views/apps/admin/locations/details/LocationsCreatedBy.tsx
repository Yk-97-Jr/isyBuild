import React from 'react'
 

import type { LocalisationRead } from '@/services/IsyBuildApi'

import CreatedByCard from '@/components/CreatedByCard'

type LocationsEditProps = {
  locationData: LocalisationRead | undefined // Adjust the type as necessary
}


const LocationsCreatedBy: React.FC<LocationsEditProps> = ({ locationData }) => {
  return (
    <div>
    <CreatedByCard createdBy={locationData?.created_by} created_at={locationData?.created_at} updated_at={locationData?.updated_at}/>
  </div>
  )
}

export default LocationsCreatedBy