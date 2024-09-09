import React, { useState, useEffect, useRef } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import classnames from 'classnames'

import MuiAlert from '@mui/material/Alert';

import type { AlertProps } from '@mui/material/Alert';

// Import your custom components and hooks
import CustomTextField from '@core/components/mui/TextField'

 // Import the useAlert hook
import { useIntersection } from '@/hooks/useIntersection'
import frontCommonStyles from '@views/front-pages/styles.module.css'
import {useContactUsSendEmailCreateMutation} from '@/services/IsyBuildApi';




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ContactUs = () => {
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)
  const { updateIntersections } = useIntersection()
  const [sendEmail] = useContactUsSendEmailCreateMutation();
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    fonction: '',
    entreprise: '',
    message: '',
  })

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    fonction: '',
    entreprise: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  // Use the useAlert hook

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Clear the error for the field on change
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    
    const frenchPhoneNumberPattern = /^(0[1-9]|(\+33\s?)[1-9])\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/;

    return frenchPhoneNumberPattern.test(phoneNumber);
  };

  const validateEmail = (email: string) => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      nom: formData.nom ? '' : 'Le champ "Nom" est obligatoire.',
      prenom: formData.prenom ? '' : 'Le champ "Prénom" est obligatoire.',
      email: validateEmail(formData.email) ? '' : 'Veuillez entrer une adresse email valide.',
      telephone: validatePhoneNumber(formData.telephone) ? '' : 'Veuillez entrer un numéro de téléphone français valide.',
      fonction: formData.fonction ? '' : 'Le champ "Fonction" est obligatoire.',
      entreprise: formData.entreprise ? '' : 'Le champ "Entreprise" est obligatoire.',
      message: '',  // The message field is not required, so no validation needed
    }

    setErrors(newErrors)

    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = validateForm();

    if (!isValid) {
      return
    }

    setIsSubmitting(true)

    try {
      await sendEmail({ contactUsEmail: formData }).unwrap();
     
      setSeverity('success');
      setAlertMessage('Message envoyé avec succès!');
      setOpenSnackbar(true);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        fonction: '',
        entreprise: '',
        message: '',
      });
    } catch (error) {
      setSeverity('error');
      setAlertMessage('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer.');
      setOpenSnackbar(true);
    }

    setIsSubmitting(false);
  }

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
    <section id='contact-us' className='plb-[100px] bg-backgroundDefault w-full' ref={ref}>
      <div className={classnames('flex flex-col gap-14 w-full', frontCommonStyles.layoutSpacing)}>
        <div className='flex flex-col gap-y-4 items-center justify-center w-full'>
          <Typography color='text.primary' variant='h4'>
            Travaillons ensemble
          </Typography>
          <Typography className='text-center'>
            Une question ou une remarque ? Écrivez-nous un message
          </Typography>
        </div>
        <div className='flex justify-center w-full'>
          <Grid container spacing={6} className='w-full'>
            <Grid item xs={12} className='w-full'>
              <Card className='w-full'>
                <CardContent className='w-full'>
                  <div className='flex flex-col items-center text-center gap-y-[6px] mbe-6'>
                    <Typography variant='h4'>Envoyer un message</Typography>
                    <Typography>
                      Si vous souhaitez discuter de quoi que ce soit concernant les paiements, les comptes, les licences, les partenariats, ou si vous avez des questions avant-vente, vous êtes au bon endroit.
                    </Typography>
                  </div>
                  <form className='flex flex-col items-start gap-6 w-full' onSubmit={handleSubmit} noValidate>
                    <div className='flex gap-5 w-full'>
                      <CustomTextField
                        fullWidth
                        label='Nom'
                        id='nom'
                        value={formData.nom}
                        onChange={handleChange}
                        error={!!errors.nom}
                        helperText={errors.nom}
                        required
                      />
                      <CustomTextField
                        fullWidth
                        label='Prénom'
                        id='prenom'
                        value={formData.prenom}
                        onChange={handleChange}
                        error={!!errors.prenom}
                        helperText={errors.prenom}
                        required
                      />
                    </div>

                    <div className='flex flex-col gap-4 w-full'>
                      <CustomTextField
                        fullWidth
                        label='Entreprise'
                        id='entreprise'
                        value={formData.entreprise}
                        onChange={handleChange}
                        error={!!errors.entreprise}
                        helperText={errors.entreprise}
                        required
                      />
                    </div>
                    <div className='flex gap-5 w-full'>
                      <CustomTextField
                        fullWidth
                        label='Adresse email'
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                      <CustomTextField
                        fullWidth
                        label='Téléphone'
                        id='telephone'
                        type='tel'
                        value={formData.telephone}
                        onChange={handleChange}
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault(); // Prevent non-numeric characters from being entered
                          }
                        }}
                        error={!!errors.telephone}
                        helperText={errors.telephone}
                        required
                      />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                      <CustomTextField
                        fullWidth
                        label='Fonction'
                        id='fonction'
                        value={formData.fonction}
                        onChange={handleChange}
                        error={!!errors.fonction}
                        helperText={errors.fonction}
                        required
                      />
                    </div>
                    <CustomTextField
                      fullWidth
                      multiline
                      rows={7}
                      label='Message'
                      id='message'
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <Button 
                      variant='contained' 
                      type='submit' 
                      disabled={isSubmitting} 
                      className='w-full'
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
                    </Button>
                  </form>
                  <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Positioning the Snackbar at the top-right corner
      >
        <Alert onClose={handleSnackbarClose} severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
     
      </Snackbar>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
