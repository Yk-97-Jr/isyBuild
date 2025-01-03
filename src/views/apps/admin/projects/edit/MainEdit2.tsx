'use client'

import React, {useState, useEffect, useContext} from 'react'

import {useParams} from 'next/navigation'

import {CircularProgress, Button} from '@mui/material'


import Templates from './Templates'

import EditInformation from './EditInformation'

import EditAddress from './EditAddress'


import CreatedBy from './CreatedBy'

import {SnackBarContext} from '@/contexts/SnackBarContextProvider'

import type {SnackBarContextType} from '@/types/apps/snackbarType'

import {
  useProjectsRetrieve2Query,
  useProjectsUpdateUpdateMutation,
  type ProjectRead,
  type ProjectUpdateRequest,
  useProjectsTemplatesListQuery,
  type ProjectEmailTemplateRead
} from '@/services/IsyBuildApi'
import HandleIntervenants from "@views/apps/admin/projects/edit/HandleIntervenants";
import Team from './Team/Team'
import NotificationFrequency from "@views/apps/admin/projects/edit/NotificationFrequency";

function MainEdit2() {
  const params = useParams()
  const projectId = parseInt(params?.edit as string)

  const [errors, setErrors] = useState<Record<string, string>>({})

  const {setOpenSnackBar, setInfoAlert} = useContext(SnackBarContext) as SnackBarContextType
  const {data: ProjectData, isLoading} = useProjectsRetrieve2Query({projectId})
  const [projectState, setProjectState] = useState<ProjectRead>()

  //state to store  Email Templates
  const {data: templates_data, isLoading: templates_loading} = useProjectsTemplatesListQuery({projectId})

  const [templates, setTemplates] = useState<ProjectEmailTemplateRead[]>()

  const [notificationFrequency, setNotificationFrequency] = useState<number | null>(null)

  const [maxNotification, setMaxNotification] = useState<number | null>(null)

  useEffect(() => {

    if (ProjectData) {
      setProjectState(ProjectData)
      setNotificationFrequency(ProjectData.notification_frequency)
      setMaxNotification(ProjectData.max_notifications)
    }


    if (templates_data) {
      setTemplates(templates_data)
    }
  }, [ProjectData, templates_data])

  console.log(templates)

  const validateForm = (
    name: string,
    code: string,
    pays: string,
    roadNumber: string,
    roadName: string,
    departement: string,
    ville: string,
    codePostal: string,
    latitude: any,
    longitude: any
  ): Record<string, string> => {
    const errors: any = {}

    if (!name || name.length < 4) {
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

    if (latitude === null || latitude < -180 || latitude > 180) {
      errors.latitude = 'Latitude is required and must be in the range of -90 to 90'
    }

    if (longitude === null || longitude < -180 || longitude > 180) {
      errors.longitude = 'Longitude is required and must be in the range of -90 to 90'
    }


    return errors
  }

  const EditedProject: ProjectUpdateRequest = {
    code: projectState?.code || '',
    name: projectState?.name || '',
    address: {
      street_number: projectState?.client?.address?.street_number || '',
      street_name: projectState?.client?.address?.street_name || '',
      postal_code: projectState?.client?.address?.postal_code || '',
      city: projectState?.client?.address?.city || '',
      department: projectState?.client?.address?.department || '',
      region: projectState?.client?.address?.region || '',
      country: projectState?.client?.address?.country
    },
    map_coordinate: {
      latitude: projectState?.map_coordinate?.latitude || '',
      longitude: projectState?.map_coordinate?.longitude || ''
    },
    max_notifications: projectState?.max_notifications|| '',
    notification_frequency: projectState?.notification_frequency|| '',
  }

  const [TriggerUpdate] = useProjectsUpdateUpdateMutation()

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault()

    const validationErrors = validateForm(
      projectState?.name || '',
      projectState?.code || '',
      projectState?.client?.address?.country || '',
      projectState?.client?.address?.street_number || '',
      projectState?.client?.address?.street_name || '',
      projectState?.client?.address?.department || '',
      projectState?.client?.address?.city || '',
      projectState?.client?.address?.postal_code || '',
      projectState?.map_coordinate?.latitude || 0,
      projectState?.map_coordinate?.longitude || 0
    )

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setErrors({})

    try {
      const projectUpdateRequest = EditedProject
      const response = await TriggerUpdate({projectId: projectId, projectUpdateRequest})

      if (response) {
        setOpenSnackBar(true)
        setInfoAlert({message: 'The Project has been Edited !!', severity: 'success'})
        window.location.reload()
      }
    } catch (err) {
      setOpenSnackBar(true)
      setInfoAlert({message: `Error Adding the project: ${err}`, severity: 'error'})
      console.error('Error updating the data', err)
    }
  }

  const handleFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setNotificationFrequency(parseInt(value))

    console.log(notificationFrequency)
  }

  const handleMaxFrequency = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setMaxNotification(parseInt(value))

    console.log(maxNotification)
  }

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <CircularProgress/>
        </div>
      ) : (
        <div className='p'>
          <div className='flex justify-between items-center p-5'>
            <p className='text-xl'>Information Sur le Projet</p>
            <div className=' flex flex-row-reverse gap-2'>
              <Button variant='contained' onClick={handleUpdate}>
                Modifier le Projet
              </Button>
              {/* <Button variant='tonal' color='secondary' >
                Annuler
              </Button> */}
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-5'>
            <div className='flex flex-col gap-5  sm:w-3/5'>
              <EditInformation
                projectState={projectState || ({} as ProjectRead)}
                setProjectState={setProjectState}
                isLoading={isLoading}
                errors={errors}
              />
              <EditAddress
                projectState={projectState || ({} as ProjectRead)}
                setProjectState={setProjectState}
                isLoading={isLoading}
                errors={errors}
              />
              <Team/>
            </div>
            <div className='sm:w-2/5 flex flex-col gap-5'>
              <HandleIntervenants/>
              <NotificationFrequency
                notificationFrequency={notificationFrequency}
                maxNotification={maxNotification}
                handleFrequency={handleFrequency}
                setNotificationFrequency={setNotificationFrequency}
                handleMaxFrequency={handleMaxFrequency}
              />
              <Templates templates={templates || []} templates_loading={templates_loading}/>
              <CreatedBy
                projectState={projectState || ({} as ProjectRead)}
                setProjectState={setProjectState}
                isLoading={isLoading}
              />


            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MainEdit2
