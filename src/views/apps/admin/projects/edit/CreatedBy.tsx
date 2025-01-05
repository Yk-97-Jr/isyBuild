import React from 'react'

import { CircularProgress} from '@mui/material'

import type{ ProjectRead } from '@/services/IsyBuildApi'
import CreatedByCard from '@/components/CreatedByCard'



interface CreatedByProps {
  projectState: ProjectRead
  setProjectState: (value: any) => void
  isLoading: boolean
}

function CreatedBy({ projectState, isLoading }: CreatedByProps) {
  if (isLoading || !projectState || !projectState.created_by) {
    return <CircularProgress />
  }

  return (
    <CreatedByCard createdBy={projectState?.created_by} created_at={projectState?.created_at} updated_at={projectState?.updated_at}/>

  )
}

export default CreatedBy
