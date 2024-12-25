'use client'

// React Imports
import {useState} from 'react'
import type {SyntheticEvent, ReactElement} from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const Tabilation = ({tabContentList}: { tabContentList: { [key: string]: ReactElement } }) => {
  // States
  const [activeTab, setActiveTab] = useState('Informations Generales')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab
              label='Informations Generales'
              icon={<i className='tabler-info-square'/>}
              iconPosition='start'
              value='Informations Generales'
            />
            <Tab
              label='Appelle Offre'
              icon={<i className='tabler-subtask'/>}
              iconPosition='start'
              value='Appelle Offre'
            />
            <Tab
              label='Gestion Administartive'
              icon={<i className='tabler-brand-google-analytics'/>}
              iconPosition='start'
              value='Gestion Administartive'
              />
             <Tab
              label='Diffusions De Documents'
              icon={<i className='tabler-file-text' />}
              iconPosition='start'
              value='Diffusions De Documents'
            />
             <Tab
              label='Finance'
              icon={<i className='tabler-report-money' />}
              iconPosition='start'
              value='Finance'
            />
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

export default Tabilation
