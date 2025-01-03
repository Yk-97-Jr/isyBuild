'use client'

// React Imports
import { useEffect, useState } from 'react'

import type { SyntheticEvent, ReactElement } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

// MUI Imports
import Grid from '@mui/material/Grid'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

const ProductDetails = ({ tabContentList }: { tabContentList: { [key: string]: ReactElement } }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State for active tab and initialization
  const [activeTab, setActiveTab] = useState<string | null>(null)

  // Initialize the active tab from the query parameter
  useEffect(() => {
    const queryTab = searchParams.get('tab')

    if (queryTab && tabContentList[queryTab]) {
      setActiveTab(queryTab)
    } else {
      setActiveTab('productlist') // Default tab
    }
  }, [searchParams, tabContentList])

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
    router.replace(`?tab=${value}`) // Update query parameter without reloading
  }

  // Don't render until the activeTab state is initialized
  if (!activeTab) return null

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab
              label='Liste des produits'
              icon={<i className='tabler-box' />}
              iconPosition='start'
              value='productlist'
            />
            <Tab
              label='Liste des catégories'
              icon={<i className='tabler-layout-grid' />}
              iconPosition='start'
              value='categorylist'
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

export default ProductDetails
