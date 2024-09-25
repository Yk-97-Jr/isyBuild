// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import CompanyAddHeader from '@views/apps/company/add/CompanyAddHeader'

import AdresseCompany from '@/views/apps/company/add/AdresseCompany'

import AddLotToCompany from '@/views/apps/company/add/AddLotToCompany'

import CompanyInfo from '@views/apps/company/add/CompanyInfo'

const eCommerceProductsAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CompanyAddHeader />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <CompanyInfo />
          </Grid>
          <Grid item xs={12}>
            <AdresseCompany />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <AddLotToCompany />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default eCommerceProductsAdd
