'use client'

// Next Imports
import dynamic from 'next/dynamic'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'

// Third Party Imports
import type { ApexOptions } from 'apexcharts'

import type { FinanceEnterpriseRead } from '@/services/IsyBuildApi'

// Components Imports


// Styled Component Imports
const AppReactApexCharts = dynamic(() => import('@/libs/styles/AppReactApexCharts'))





const PaymentProgressChart = ({data}:{data:FinanceEnterpriseRead | undefined}) => {

    const total = data?.final_amount ? parseFloat(data.final_amount) : 0;
  const paid = data?.payment_cumulated ? parseFloat(data.payment_cumulated) : 0;
 

  const paidPercentage = total > 0 ? (paid / total) * 100 : 0;
  const remainingPercentage = 100 - paidPercentage;

  Math.round
    const deliveryExceptionsChartSeries = [Math.round(paidPercentage*100)/100, (Math.round(remainingPercentage*100)/100)]

  // Hooks
  const theme = useTheme()

  const options: ApexOptions = {
    labels: ['Payé', 'Restant'],
    stroke: {
      width: 0
    },
    colors: [
      'var(--primary-color)',
      'var(--mui-palette-warning-main)',
    ],
    dataLabels: {
      enabled: false,
      formatter:(val)=> Number(val).toFixed(2)
      
    },
    legend: {
      show: true,
      position: 'bottom',
      offsetY: 10,
      markers: {
      
        offsetY: 1,
        offsetX: theme.direction === 'rtl' ? 8 : -4
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '13px',
      fontWeight: 400,
      labels: {
        colors: 'var()',
        useSeriesColors: false
      }
    },
    grid: {
      padding: {
        top: 15
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            value: {
              fontSize: '15px',
              color: 'var(--mui-palette-text-primary)',
              fontWeight: 500,
              offsetY: -20
            },
            name: { offsetY: 20 },
            total: {
              show: true,
              fontSize: '0.7375rem',
              fontWeight: 200,
              label: 'Payé',
              color: 'var(--mui-palette-text-secondary)',
              formatter() {
                return paidPercentage.toFixed(2)+"%" 
              }
            }
          }
        }
      }
    }
  }

  return (
    <Card className='bs-fit'>
      <CardHeader title='Paiements: Payé vs Restant'  />
      <CardContent>
        <AppReactApexCharts
          type='donut'
          height={252}
          width='100%'
          series={deliveryExceptionsChartSeries}
          options={options}
        />
    
      </CardContent>
    </Card>
  )
}

export default PaymentProgressChart
