'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Third-party Imports
import classnames from 'classnames'

import type { Mode } from '@core/types'

// Component Imports
import Link from '@components/Link'
import Logo from '@components/layout/shared/Logo'
import CustomAvatar from '@core/components/mui/Avatar'

// Hooks Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Util Imports
import { frontLayoutClasses } from '@layouts/utils/layoutClasses'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const Footer = ({ mode }: { mode: Mode }) => {
  // Vars
  const footerImageLight = '/images/front-pages/footer-bg-light.png'
  const footerImageDark = '/images/front-pages/footer-bg-dark.png'

  // Hooks
  const dashboardImage = useImageVariant(mode, footerImageLight, footerImageDark)

  return (
    <footer className={frontLayoutClasses.footer}>
      <div className='relative'>
        <img src={dashboardImage} alt='footer bg' className='absolute inset-0 is-full bs-full object-cover -z-[1]' />
        <div className={classnames('plb-12 text-white', frontCommonStyles.layoutSpacing)}>
          <Grid container rowSpacing={10} columnSpacing={12} alignItems="center">
            <Grid item xs={12} lg={6}>
              <div className='flex items-center'>
                <Link href='/home'>
                  <Logo color='var(--mui-palette-common-white)' />
                </Link>
              </div>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className='flex justify-end items-center gap-8'>
                <div className='flex items-center gap-2'>
                  <CustomAvatar variant='rounded' size={36} skin='light' color='primary'>
                    <i className='tabler-mail' />
                  </CustomAvatar>
                  <Typography color='white' className='font-medium' style={{ whiteSpace: 'nowrap' }}>
                    contact@isybuild.com
                  </Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <CustomAvatar variant='rounded' size={36} skin='light' color='success'>
                    <i className='tabler-phone' />
                  </CustomAvatar>
                  <Typography color='white' className='font-medium' style={{ whiteSpace: 'nowrap' }}>
                    +33 753 85 18 25
                  </Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <CustomAvatar variant='rounded' size={36} skin='light' color='success'>
                    <i className='tabler-brand-whatsapp' />
                  </CustomAvatar>
                  <Typography color='white' className='font-medium' style={{ whiteSpace: 'nowrap' }}>
                    +33 753 85 18 25
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className='bg-[#211B2C]'>
        <div
          className={classnames(
            'flex flex-wrap items-center justify-center sm:justify-between gap-4 plb-[15px]',
            frontCommonStyles.layoutSpacing
          )}
        >
          <Typography className='text-white' variant='body2'>
            <span>{`© ${new Date().getFullYear()}, isybuild`}</span>
          </Typography>
        </div>
      </div>
    </footer>
  )
}

export default Footer
