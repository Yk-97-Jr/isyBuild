'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent, ReactElement } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const ClientDetails = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  // States
  const [activeTab, setActiveTab] = useState('infoclient')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab label='Informations Generales' icon={<i className='tabler-info-square' />} iconPosition='start' value='infoclient' />
            <Tab label='Projets' icon={<i className='tabler-subtask' />} iconPosition='start' value='projectsclient' />
            <Tab label='Lots' icon={<i className='tabler-space' />} iconPosition='start' value='lotsclient' />
            <Tab label='Entreprise' icon={<i className='tabler-buildings' />} iconPosition='start' value='entrepriseclient' />
            <Tab label='Utilisateurs' icon={<i className='tabler-users' />} iconPosition='start' value='usersclient' />
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default ClientDetails
