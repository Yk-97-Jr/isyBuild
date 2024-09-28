'use client'

import React, { useContext, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@mui/material'

import type { ProjectCreateRequest } from '@/services/IsyBuildApi'
import { useProjectsCreateCreateMutation } from '@/services/IsyBuildApi'

import ProjectInformation from '@/views/projects/Add/ProjectInformation'
import Location from '@/views/projects/Add/Location'
import AddressInfo from '@/views/projects/Add/AddressInfo'
import Details from '@/views/projects/Add/Details'

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
  const [client, setClient] = useState({ id: 0 })

  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  const handleSubmit = async (e: any) => {
    e.preventDefault()

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
        router.push('/Projects')
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'success', message: 'The project has been added correctly' })
      }

      window.location.reload()
    } catch (error) {
      setOpenSnackBar(true)
      setInfoAlert({ severity: 'error', message: 'Error adding the project' })
      console.error('Error creating project:', error)
    }
  }

  return (
    <div className=''>
      <div className='flex justify-between py-4'>
        <h1>Create a Project</h1>
        <Button variant='contained' className='px-10' onClick={handleSubmit}>
          Create
        </Button>
      </div>
      <div className='flex sm:flex-row flex-col gap-2'>
        <div className='w-3/2 flex flex-col gap-2'>
          <ProjectInformation
            Name={name}
            setName={setName}
            code={code}
            setCode={setCode}
            date={date}
            setDate={setDate}
            description={description}
            setDescription={setDescription}
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
          />
        </div>
        <div className='w-3/2 flex flex-col gap-2 '>
          <Location latitude={latitude} setLatitude={setLatitude} longitude={longitude} setLongitude={setLongitude} />
          <Details client={client} setClient={setClient} />
        </div>
      </div>
    </div>
  )
}

export default Page
