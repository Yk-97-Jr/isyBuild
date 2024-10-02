'use client'
import React, { useState, useEffect } from 'react'

import { useParams ,useRouter} from 'next/navigation'

import { Button } from '@mui/material'

import EditInformation from './EditInformation'

import EditAddress from './EditAddress'

import Details from './Details'

import { useProjectsUpdateUpdateMutation, useProjectsRetrieve2Query } from '@/services/IsyBuildApi'

import type { ProjectUpdateRequest} from "@/services/IsyBuildApi"


import CreatedBy from './CreatedBy'

function MainEdit() {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const params = useParams()

  const projectId = parseInt(params?.edit as string)

  const [updateProject] = useProjectsUpdateUpdateMutation()

  const { data: projectData, isLoading: isLoadingProject } = useProjectsRetrieve2Query({ projectId })

  const [projectState, setProjectState] = useState<ProjectUpdateRequest | null>(null)

  useEffect(() => {
    if (projectData) {
      console.log(projectData)
      setProjectState(projectData)
    }
  }, [projectData])

  const validateForm = (
    name: string,
    code: string,
    date: Date,
    pays: string,
    roadNumber: string,
    roadName: string,
    departement: string,
    ville: string,
    codePostal: string,
    latitude: string | null,
    longitude: string | null

    // client: any

  ): Record<string, string> => {
    const errors: Record<string, string> = {}

    if 
    (!name || name.length < 4)
     {
      errors.name = 'Name is required and must be at least 4 characters long'
    }

    if (!code || code.length < 4) {
      errors.code = 'Code is required and must be at least 4 characters long'
    }

    if (!pays) {
      errors.pays = 'Country is required'
    }

    if (!roadNumber || !/^\d{4,}$/.test(roadNumber)) {
      errors.roadNumber = 'Road number is required and must be a number with at least 4 digits'
    }

    if (!roadName || roadName.length < 4) {
      errors.roadName = 'Road name is required and must be at least 4 characters long'
    }

    if (!codePostal || !/^\d{5}$/.test(codePostal.toString())) {
      errors.codePostal = 'Postal code is required and must be a 5-digit number'
    }

    if (!departement || departement.length < 2) {
      errors.departement = 'Department is required and must be at least 2 characters long'
    }

    if (!ville || ville.length < 2) {
      errors.ville = 'City is required and must be at least 2 characters long'
    }

    if (latitude === null || parseInt(latitude) < -90 || parseInt(latitude) > 90) {
      errors.latitude = 'Latitude is required and must be in the range of -90 to 90'
    }

    if (longitude === null || parseInt(longitude) < -180 || parseInt(longitude) > 180) {
      errors.longitude = 'Longitude is required and must be in the range of -180 to 180'
    }

    // if (!client.id) {
    //   errors.client = 'Please select a client'
    // }

    return errors
  }

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validationErrors = validateForm(
      projectState?.name || '',
      projectState?.code || '',
      projectState?.start_date ? new Date(projectState.start_date) : new Date(),
      projectState?.address?.country || '',
      projectState?.address?.street_number || '',
      projectState?.address?.street_name || '',
      projectState?.address?.department || '',
      projectState?.address?.city || '',
      projectState?.address?.postal_code || '',
      projectState?.map_coordinate?.latitude || '',
      projectState?.map_coordinate?.longitude || ''
    )

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      console.error('Validation errors:', validationErrors)

      return

    }

    setErrors({})

    const submitData: ProjectUpdateRequest = {
      code: projectState?.code as string,
      name: projectState?.name as string,
      description: projectState?.description || '',
      start_date: projectState?.start_date || new Date().toISOString().split('T')[0],
      budget: undefined,
      address: {
        street_number: projectState?.address?.street_number || '',
        street_name: projectState?.address?.street_name || '',
        postal_code: projectState?.address?.postal_code || '',
        city: projectState?.address?.city || '',
        department: projectState?.address?.department || '',
        country: projectState?.address?.country || ''
      },
      map_coordinate: {
        latitude: projectState?.map_coordinate?.latitude || '',
        longitude: projectState?.map_coordinate?.longitude || ''
      },
      notes: projectState?.description || ''
    }

    try {
      const result = await updateProject({ projectId, projectUpdateRequest: submitData }).unwrap()

      if (result) {
        console.log('Project updated successfully')
        router.push('/Projects')
      } else {
        throw new Error('Update failed: No result returned')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      setErrors({ submit: 'Failed to update project. Please try again.' })
    }
  }


  if (isLoadingProject) {

    return <div>Loading...</div>

  }

  return (
    <div className='p-2'>
      <div className='py-2'>
        <div className='flex gap-2 justify-between'>
          <div className='flex gap-2'>
            <Button children='Information Genrale' variant='contained'></Button>
            <Button
              children='Appele Offre '
              variant='outlined'
              href={`/Projects/edit/${projectId}/appeleOffre`}
            ></Button>
          </div>
          <Button children='Submit' variant='outlined' type='submit' onClick={e => handleSubmit(e as any)}></Button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex  flex-col sm:flex-row  gap-2'>
          <div className='flex flex-col gap-2 sm:w-3/2 '>
            <EditInformation projectState={projectState} setProjectState={setProjectState} errors={errors} />
            <EditAddress projectState={projectState} setProjectState={setProjectState} errors={errors} />
          </div>
          <div className='sm:w-2/3 flex flex-col gap-3'>
            <Details projectState={projectState} setProjectState={setProjectState} />
            <CreatedBy projectState={projectState} setProjectState={setProjectState} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default MainEdit
