// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { FormHelperText, InputLabel, Select } from '@mui/material'

import { MenuItem } from '@mui/material'

import { EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'

import { useClientsRetrieveQuery } from '@/services/IsyBuildApi'

interface DetailsProps {
  client: any
  setClient: any
  errors: any
}

const Details = ({ client, setClient, errors }: DetailsProps) => {
  const { data: clients, isLoading, error } = useClientsRetrieveQuery({ page: 1, pageSize: 100 })

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedClientId = event.target.value as number

    const selectedClient = clients?.results.find(c => c.id === selectedClientId)

    setClient(selectedClient)

    console.log(client)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write some notes'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],

    content: ''

    // onUpdate: ({ editor }) => {

    //   // const updatedDescription = editor.getText()

    // }
  })

  return (
    <Card>
      <CardHeader title='Details' />
      <CardContent>
        <div className='mb-2'>
          <InputLabel children='CLient' />
          <Select
            displayEmpty
            fullWidth
            size='small'
            onChange={event => handleClientChange(event as React.ChangeEvent<{ value: unknown }>)}
          >
            <MenuItem value='' disabled>
              Select a Client
            </MenuItem>
            {isLoading && <MenuItem>Loading...</MenuItem>}
            {error && <MenuItem>Error loading clients</MenuItem>}
            {clients?.results.map((client: { id: string | number; name: string }) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
          {errors && <FormHelperText className='text-red-500'>{errors.client}</FormHelperText>}
        </div>
        <InputLabel className='py-1'>Notes(Optional)</InputLabel>
        <Card className='p-0 border shadow-none'>
          <CardContent className='p-0'>
            <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' placeholder='Description' />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default Details
