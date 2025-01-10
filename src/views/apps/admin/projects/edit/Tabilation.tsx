'use client'

import { useEffect, useState } from 'react'

import type { SyntheticEvent } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import CustomTabList from '@core/components/mui/TabList'

const Tabilation = ({ tabContentList }: { tabContentList: { [key: string]: React.ReactElement } }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for active tab and initialization status
  const [activeTab, setActiveTab] = useState<string | null>(null)

  // Sync `activeTab` with query parameter on page load
  useEffect(() => {
    const queryTab = searchParams.get('tab')

    if (queryTab && tabContentList[queryTab]) {
      setActiveTab(queryTab)
    } else {
      setActiveTab('Informations Generales') // Default tab
    }
  }, [searchParams, tabContentList])

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
    router.replace(`?tab=${value}`) // Update the URL query parameter without a full page reload
  }

  // Don't render until activeTab is initialized
  if (!activeTab) return null

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant="scrollable" pill="true">
            <Tab label="Informations Generales" value="Informations Generales" />
            <Tab label="Appelle Offre" value="Appelle Offre" />
            <Tab label="Gestion Administartive" value="Gestion Administartive" />
            <Tab label="Diffusions De Documents" value="Diffusions De Documents" />
            <Tab label="Finance" value="Finance" />
          </CustomTabList>
        </Grid>
        <Grid item xs={12}>
          <TabPanel value={activeTab}>{tabContentList[activeTab]}</TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default Tabilation
