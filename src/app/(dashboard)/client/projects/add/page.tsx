'use client'

import React, { useContext, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@mui/material'

import type { ProjectCreateRequest } from '@/services/IsyBuildApi'
import { useProjectsCreateCreateMutation } from '@/services/IsyBuildApi'

import ProjectInformation from '@/views/apps/client/projects/Add/ProjectInformation'
import Location from '@/views/apps/client/projects/Add/Location'
import AddressInfo from '@/views/apps/client/projects/Add/AddressInfo'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'

import type { SnackBarContextType } from '@/types/apps/snackbarType'

function Page() {
  const router = useRouter()
  const [createProject] = useProjectsCreateCreateMutation()

  const [name, setName] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [description, setDescription] = useState<string>('')
  const [pays, setPays] = useState<string>('')
  const [roadNumber, setRoadNumber] = useState<string>('')
  const [roadName, setRoadName] = useState<string>('')
  const [departement, setDepartement] = useState<string>('')
  const [ville, setVille] = useState<string>('')
  const [codePostal, setCodePostal] = useState<number>(0)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [client, setClient] = useState({ id: null })

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (
    name: string,
    code: string,
    date: Date,
    pays: string,
    roadNumber: string,
    roadName: string,
    departement: string,
    ville: string,
    codePostal: number,
    latitude: any,
    longitude: any,
    client: any
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
      errors.latitude = 'Latitude is required and must be  in the range of  -90 90'
    }

    if (longitude === null || longitude < -180 || longitude > 180) {
      errors.longitude = 'Latitude is required and must be  in the range of  -90 90'
    }

    if (!client.id) {
      errors.client = 'Please Select a client'
    }

    return errors
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const validationErrors = validateForm(
      name,
      code,
      date,
      pays,
      roadNumber,
      roadName,
      departement,
      ville,
      codePostal,
      latitude,
      longitude,
      client
    )

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      return
    }

    setErrors({})

    const submitData: ProjectCreateRequest = {
      code,
      name,
      description,
      client_id: client.id,
      start_date: date.toISOString().split('T')[0],
      address: {
        street_number: roadNumber,
        street_name: roadName,
        postal_code: codePostal.toString(),
        city: ville,
        department: departement,
        country: pays
      },
      map_coordinate: {
        latitude: latitude?.toString() ?? '',
        longitude: longitude?.toString() ?? ''
      },
      notes: description
    }

    try {
      const result = await createProject({ projectCreateRequest: submitData }).unwrap()

      if (result) {
        router.push(`${result.id}/details`)
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'success', message: 'The project has been added correctly' })
        console.log(result)
      }

      // window.location.reload()
    } catch (error) {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: 'Error adding the project' })
      console.error('Error creating project:', error)
    }
  }

  return (
    <div className=''>
      <div className='flex sm:flex-row flex-col gap-5 justify-between py-4'>
        <h1>Create a Project</h1>
        <Button variant='contained' className='px-10' onClick={handleSubmit}>
          Create
        </Button>
      </div>
      <div className='flex md:flex-row flex-col gap-4'>
        <div className=' flex flex-col gap-4'>
          <ProjectInformation
            Name={name}
            setName={setName}
            code={code}
            setCode={setCode}
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
            errors={errors}
            setClient={setClient}
          />
          <AddressInfo
            pays={pays}
            setPays={setPays}
            RoadNumber={roadNumber}
            setRoadNumber={setRoadNumber}
            RoadName={roadName}
            setRoadName={setRoadName}
            departement={departement}
            setDepartement={setDepartement}
            ville={ville}
            codePostal={codePostal}
            setCodePostal={setCodePostal}
            setVille={setVille}
            errors={errors}
          />
        </div>
        <div className='flex flex-col gap-4 w-full '>
          <Location
            latitude={latitude}
            setLatitude={setLatitude}
            longitude={longitude}
            setLongitude={setLongitude}
            errors={errors}
          />
        </div>
      </div>
    </div>
  )
}

export default Page
