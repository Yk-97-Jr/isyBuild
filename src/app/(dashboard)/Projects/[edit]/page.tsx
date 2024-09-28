import React from 'react'

interface EditProjectParams {
  params: {
    edit: string
  }
}

export default function EditProject({ params }: EditProjectParams) {
  return (
    <div>
      <h1>Edit Project: {params.edit}</h1>
      {/* Add your edit project form or components here */}
    </div>
  )
}
