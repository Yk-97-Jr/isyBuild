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
import type {SuiviAdministrativeStepRead} from "@/services/IsyBuildApi";

const Tabilation = ({
                      tabContentList,
                      step,
                    }: {
  tabContentList:  {[key: string]: (step: SuiviAdministrativeStepRead | undefined) => ReactElement };
  step: SuiviAdministrativeStepRead | undefined;
}) => {
  // States
  const [activeTab, setActiveTab] = useState('Details')

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab
              label='Details'
              icon={<i className='tabler-info-square'/>}
              iconPosition='start'
              value='Details'
            />
            <Tab
              label='Section des commentaires'
              icon={<i className='tabler-subtask'/>}
              iconPosition='start'
              value='Section des commentaires'
            />
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab](step)}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default Tabilation
