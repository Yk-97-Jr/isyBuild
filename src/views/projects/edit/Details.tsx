/* eslint-disable import/no-named-as-default */
'use client'
import React from 'react'

import Card from '@mui/material/Card'

import { CardContent, CardHeader } from '@mui/material'

import { EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

import Placeholder from '@tiptap/extension-placeholder'

import TextAlign from '@tiptap/extension-text-align'

import Underline from '@tiptap/extension-underline'


interface DetailsProps {
  projectState: any
  setProjectState: any
}

function Details({ projectState }: DetailsProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: '',


    // onUpdate: ({ editor }) => {
    //   // const updatedDescription = editor.getText()
    //   // setProjectState({ ...ProjectState, description: updatedDescription })
    // }

  })

  // const getDisplayValue = (value: string | { id: string; [key: string]: any }) => {
  //   if (typeof value === 'string') return value
  //   return value.id || 'N/A'
  // }
  //   const  {client} = projectData
  // console.log("Test01"+ProjectState)
  
  if (!projectState) {

    
     return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader title='Details' />
      <div className='flex flex-col gap-2 px-5 py-5'>
        <h3>
          <strong>Client:</strong> {projectState.client.name}
        </h3>
        <h3>
          <strong>Status: </strong>
          {projectState.status}
        </h3>
        <p>{/* <strong>Niveau de Risque:{projectState.risk_leve}</strong> */}</p>

        <p className='mt-2'>Note:</p>
        <Card className='py-2 border shadow-none'>
          <CardContent className='p-2'>
            <EditorContent editor={editor} className='min-h-[135px] overflow-y-auto flex' />
          </CardContent>
        </Card>
      </div>
    </Card>
  )
}

export default Details
