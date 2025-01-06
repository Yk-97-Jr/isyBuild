import React from 'react'
 


import type { LotRead } from '@/services/IsyBuildApi'

import CreatedByCard from '@/components/CreatedByCard'

type LotsEditProps = {
  lotData: LotRead | undefined // Adjust the type as necessary
}



const LotsCreatedBy: React.FC<LotsEditProps> = ({ lotData }) => {
  return (
    <CreatedByCard createdBy={lotData?.created_by} created_at={lotData?.created_at} updated_at={lotData?.updated_at}/>

  )
}

export default LotsCreatedBy
