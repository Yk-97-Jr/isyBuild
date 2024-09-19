// React Imports
import { useEffect, useRef } from 'react'

// MUI Imports
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { useIntersection } from '@/hooks/useIntersection'

// SVG Imports
import Briefcase from '@assets/svg/front-pages/landing-page/Briefcase'
import LaptopCharging from '@assets/svg/front-pages/landing-page/LaptopCharging'
import CalendarTime from '@assets/svg/front-pages/landing-page/CalendarTime'
import Bank from '@assets/svg/front-pages/landing-page/Bank'
import User from '@assets/svg/front-pages/landing-page/User'
import Document from '@assets/svg/front-pages/landing-page/Document'
import MessageIcon from '@assets/svg/front-pages/landing-page/MessageIcon'
import NotificationIcon from '@assets/svg/front-pages/landing-page/NotificationIcon'

// Styles Imports
import frontCommonStyles from '@views/front-pages/styles.module.css'

// Data
const feature = [
  {
    icon: <Briefcase color='var(--mui-palette-primary-main)' />,
    title: 'Gestion d\'appels d\'offres',
    description: 'Centraliser, simplifier et automatiser le processus de création, de suivi et d\'attribution des appels d\'offres.'
  },
  {
    icon: <LaptopCharging color='var(--mui-palette-primary-main)' />,
    title: 'Suivi administratif',
    description: 'Centraliser, relancer et automatiser les tâches pour une gestion efficace et conforme des chantiers.'
  },
  {
    icon: <CalendarTime color='var(--mui-palette-primary-main)' />,
    title: 'Plannification géotemporelle et suivi de productivité',
    description: 'Inspirée du Lean management, elle permet de suivre les travaux par zone et par tâche afin d\'optimiser au maximum la productivité.'
  },
  {
    icon: <Bank color='var(--mui-palette-primary-main)' />,
    title: 'Gestion financière',
    description: 'Centraliser le suivi des budgets, des dépenses, le planning et l\'avancement afin d\'assurer une maîtrise optimale des coûts et des ressources tout au long des projets.'
  },
  {
    icon: <User color='var(--mui-palette-primary-main)' />,
    title: 'Gestion des ressources',
    description: 'Allouer, suivre et optimiser l\'utilisation des ressources humaines, matériaux et matérielles pour garantir l\'efficacité et la rentabilité des projets.'
  },
  {
    icon: <Document color='var(--mui-palette-primary-main)' />,
    title: 'Compte rendu personnalisé',
    description: 'Générer des rapports sur mesure, adaptés à chaque interlocuteur.'
  },
  {
    icon: <NotificationIcon color='var(--mui-palette-primary-main)' />,
    title: 'Système de rappels et notifications',
    description: 'Restez informé des événements importants grâce à un système de rappels et de notifications intégré à la plateforme.'
  },
  {
    icon: <MessageIcon color='var(--mui-palette-primary-main)' />,
    title: 'Messagerie',
    description: 'Facilitez la communication avec une messagerie intégrée pour échanger rapidement des informations et des mises à jour.'
  }
]

const UsefulFeature = () => {
  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id='features' ref={ref} className='bg-backgroundPaper'>
      <div className={classnames('flex flex-col gap-12 pbs-12 pbe-[100px]', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center'>
          <Chip size='small' variant='tonal' color='primary' label='Fonctionnalité utile' />
          <div className='flex flex-col items-center gap-y-1 justify-center flex-wrap'>
            <div className='flex items-center gap-x-2'>
              <Typography color='text.primary' variant='h4' className='text-center'>
                <span className='relative z-[1] font-extrabold'>
                Tout ce dont vous avez besoin
                  <img
                    src='/images/front-pages/landing-page/bg-shape.png'
                    alt='bg-shape'
                    className='absolute block-end-0 z-[1] bs-[40%] is-[125%] sm:is-[132%] -inline-start-[13%] sm:inline-start-[-19%] block-start-[17px]'
                  />
                </span>{' '}
                pour démarrer votre prochain projet
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <Grid container spacing={6}>
            {feature.map((item, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <div className='flex flex-col gap-2 justify-center items-center'>
                  {item.icon}
                  <Typography className='mbs-2' variant='h5'>
                    {item.title}
                  </Typography>
                  <Typography className='max-is-[364px] text-center'>{item.description}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default UsefulFeature
