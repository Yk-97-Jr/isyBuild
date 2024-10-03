'use client'
import React from 'react'

import Card from '@mui/material/Card'



interface DetailsProps {
  projectState: any
  setProjectState: any
}

function CreatedBy({ projectState }: DetailsProps) {

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         placeholder: 'Write something here...'
//       }),
//       TextAlign.configure({
//         types: ['heading', 'paragraph']
//       }),
//       Underline
//     ],
//     content: '',
//     onUpdate: ({ editor }) => {

//     //   const updatedDescription = editor.getText()
//     }
//   })

  if (!projectState) {

    return <div>Loading...</div>

  }

  //   const [imgSrc, setImgSrc] = useState<string>('')
  return (
    <Card>
      <p className='py-4 px-3 font-semibold text-gray-500 text-lg'>Cree Par</p>
      <div className='flex gap-2 px-4 items-center  mt-2 justify-start'>
        <div>
          <img height={50} width={50} className=' rounded-full' src='/images/avatars/1.png' alt='Profile' />
        </div>
        <div className='flex  flex-col'>
          <p className='text-lg'>{projectState.client.name}</p>
          <p className='text-lg'>{projectState.client.contact_email}</p>
        </div>
      </div>
      <div className='py-4 px-5   mt-5 0 text-lg'>
        <p className='text-gray-500 font-semibold'>Plus De details</p>
        <div className='flex  flex-col gap-2'>
          <div>
            <p className='text-lg'>
              Created at: <span>{projectState.created_at}</span>
            </p>
            <p>
              Created par:{' '}
              <span>
                {projectState.created_by.first_name} {projectState.created_by.last_name}
              </span>
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </Card>
  )
}

export default CreatedBy
