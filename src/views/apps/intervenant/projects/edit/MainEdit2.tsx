'use client'

import React, {useState, useEffect} from 'react'

import {useParams} from 'next/navigation'

import {CircularProgress} from '@mui/material'


import EditInformation from './EditInformation'



import CreatedBy from './CreatedBy'

import type {
  ProjectForIntervenantRead,
} from '@/services/IsyBuildApi';
import {useGetIntervenantProjectDetailQuery} from "@/services/IsyBuildApi";

function MainEdit2() {
  const params = useParams()
  const projectId = parseInt(params?.edit as string)

  const [errors] = useState<Record<string, string>>({})

  const {data: ProjectData, isLoading} = useGetIntervenantProjectDetailQuery({projectId})
  const [projectState, setProjectState] = useState<ProjectForIntervenantRead>()


  useEffect(() => {

    if (ProjectData) {
      setProjectState(ProjectData)

    }


  }, [ProjectData])


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
              {/*<Button variant='contained' onClick={handleUpdate}>*/}
              {/*  Modifier le Projet*/}
              {/*</Button>*/}
              {/*/!* <Button variant='tonal' color='secondary' >*/}
              {/*  Annuler*/}
              {/*</Button> *!/*/}
            </div>
          </div>
          <div className='flex flex-col sm:flex-row gap-5'>
            <div className='flex flex-col gap-5  sm:w-3/5'>
              <EditInformation
                projectState={projectState || ({} as ProjectForIntervenantRead)}
                setProjectState={setProjectState}
                isLoading={isLoading}
                errors={errors}
              />
              {/*<EditAddress*/}
              {/*  projectState={projectState || ({} as ProjectForIntervenantRead)}*/}
              {/*  setProjectState={setProjectState}*/}
              {/*  isLoading={isLoading}*/}
              {/*  errors={errors}*/}
              {/*/>*/}
            </div>
            <div className='sm:w-2/5 flex flex-col gap-5'>
              {/*<HandleIntervenants/>*/}
              {/*<NotificationFrequency*/}
              {/*  notificationFrequency={notificationFrequency}*/}
              {/*  maxNotification={maxNotification}*/}
              {/*  handleFrequency={handleFrequency}*/}
              {/*  setNotificationFrequency={setNotificationFrequency}*/}
              {/*  handleMaxFrequency={handleMaxFrequency}*/}
              {/*/>*/}
              {/*<Templates templates={templates || []} templates_loading={templates_loading}/>*/}
              <CreatedBy
                projectState={projectState}
              />


            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MainEdit2
