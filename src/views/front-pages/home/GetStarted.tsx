// Next Imports
import Link from 'next/link'

// MUI Imports
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { SystemMode } from '@core/types'

// Hooks Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

const GetStarted = ({ mode }: { mode: SystemMode }) => {
  // Vars

  const surveyUrl = process.env.NEXT_PUBLIC_GOOGLE_FORMS_URL;
  const getStartedImageLight = '/images/front-pages/landing-page/get-started-bg-light.png'
  const getStartedImageDark = '/images/front-pages/landing-page/get-started-bg-dark.png'

  // Hooks
  const getStartedImage = useImageVariant(mode, getStartedImageLight, getStartedImageDark)

  return (
    <section className='relative'>
      <img
        src={getStartedImage}
        alt='background-image'
        className='absolute is-full flex -z-1 pointer-events-none bs-full block-end-0'
      />
      <div
        className={classnames(
          'flex items-center flex-wrap justify-center lg:justify-between gap-y-4 gap-x-28',
          frontCommonStyles.layoutSpacing
        )}
      >
        <div className='flex flex-col items-start gap-y-8 pbs-9 lg:plb-9 z-[1]'>
          <div className='flex flex-col'>
            <Typography variant='h3' color='primary' className='font-bold text-[2.125rem]'>
            Votre avis compte ! 
            </Typography>
            <Typography variant='h5' color='text.secondary'>
            Aidez-nous à façonner la meilleure plateforme de gestion de chantier en répondant à notre questionnaire.
            </Typography>
          </div>
          <Button 
          component={Link} 
          href={surveyUrl || '#'}
          variant='contained'>
             Répondre au Sondage
          </Button>
        </div>
  
      </div>
    </section>
  )
}

export default GetStarted
