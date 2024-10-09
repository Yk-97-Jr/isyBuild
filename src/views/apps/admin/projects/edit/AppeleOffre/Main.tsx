'use client'
import React, { useState, useEffect } from 'react'

import { useParams } from 'next/navigation'

import AppeleOffreTable from './AppeleOffreTable'

import type { PaginatedLotRead,ProjectRead } from '@/services/IsyBuildApi'

import { useLotsRetrieveQuery, useProjectLotsRetrieveQuery, useProjectsRetrieveQuery } from '@/services/IsyBuildApi'

import type{ ProjectLotRead } from '@/services/IsyBuildApi'

function Main() {
  const params = useParams()

  const projectId = parseInt(params.edit.toString()) //get the project id from the url

  const [projectsLot, setProjectLot] = useState<ProjectLotRead>() //state to store projects-lot

  const [lots, setlots] = useState<PaginatedLotRead>() // state to store  lot from the backend

  //Query to get the project-lot using rtk

  //NOTE THIS IS NOT GONA WORK UNTIL I CREATE THE UI AND ASSIGN SOME LOT TO THE PROJECTS

  const { data: projectLot } = useProjectLotsRetrieveQuery({ projectId: projectId, page: 1, pageSize: 100 })

  useEffect(() => {
    if (projectLot) {
      setProjectLot(projectLot.results[0])
    }

    console.log(lots+""+projectsLot)
  }, [projectLot])

  //get all the Los
  const { data: Lots } = useLotsRetrieveQuery({ page: 1, pageSize: 100 })

  useEffect(() => {

    if (!Lots) {
      console.log('Error Getting data from the backend')
    }

    if (Lots) {
      setlots(Lots)
    }
  }, [Lots])

  //CRUD functions
 
  const handleDelete = (id: number) => {
    console.log('Dleate function'+id)
  }

  const handleEdit = (id: number) => {
    console.log('Edit function'+id)
  }

  //DUMMY DATA TO SHOW

  const [tableRows, setTableRows] = useState<Partial<ProjectRead>[]>([])

  console.log(tableRows)

  //retrive the data from the backend
  const { data: Client } = useProjectsRetrieveQuery({ page: 1, pageSize: 100 })

  // States for pagination or other parameters
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  //   useEffect(() => {
  //     if (Lots && Lots.results) {
  //       setTableRows(
  //         Lots.results.map(Lots => ({
  //           id: Lots.id,
  //           name: Lots.name,
  //           contact: Lots.contact,
  //           status: project.status
  //         }))
  //       )
  //     }
  //   }, [Client])

  const finallots = Lots?.results[0]
  const countRecords = Client?.count
  const { data, error, isLoading, isFetching, refetch } = useProjectsRetrieveQuery({ page, pageSize })

console.log(data+""+error+""+isLoading)

  return (
    <div>
      <AppeleOffreTable
        pageSize={pageSize}
        setPageSize={setPageSize}
        page={page}
        setPage={setPage}
        data={finallots ? [finallots] : undefined}
        countRecords={countRecords}
        isFetching={isFetching}
        refetch={refetch}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setTableRows={setTableRows}
      />
    </div>
  )
}

export default Main
