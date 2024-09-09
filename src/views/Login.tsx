'use client';

// Imports React
import { useState } from 'react';

// Imports Next
import { useRouter } from 'next/navigation';

// Imports MUI
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

// Imports tiers
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classnames from 'classnames';

// Imports des composants
import Link from '@components/Link';
import Logo from '@components/layout/shared/Logo';
import CustomTextField from '@core/components/mui/TextField';

// Imports de configuration
import themeConfig from '@configs/themeConfig';

// Imports des hooks
import { useImageVariant } from '@core/hooks/useImageVariant';
import { useSettings } from '@core/hooks/useSettings';

// Imports des mutations
import { useLoginCreateMutation } from '@/services/IsyBuildApi';
import { verifyToken } from '@/utils/verifyToken';

// Composants stylés personnalisés
const LoginIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  blockSize: 'auto',
  maxBlockSize: 680,
  maxInlineSize: '100%',
  margin: theme.spacing(12),
  [theme.breakpoints.down(1536)]: {
    maxBlockSize: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxBlockSize: 450
  }
}));

const MaskImg = styled('img')({
  blockSize: 'auto',
  maxBlockSize: 355,
  inlineSize: '100%',
  position: 'absolute',
  insetBlockEnd: 0,
  zIndex: -1
});

// Schéma de validation Yup
const schema = yup.object({
  email: yup.string().email('Veuillez entrer un email valide').required('L\'email est requis'),
  password: yup.string().required('Le mot de passe est requis')
}).required();

const LoginV2 = ({ mode }: { mode: 'light' | 'dark' }) => {
  // États
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  // Hooks
  const router = useRouter();
  const { settings } = useSettings();
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down('md'));
  const authBackground = useImageVariant(mode, '/images/pages/auth-mask-light.png', '/images/pages/auth-mask-dark.png');

  const characterIllustration = useImageVariant(
    mode,
    '/images/illustrations/auth/v2-login-light.png',
    '/images/illustrations/auth/v2-login-dark.png',
    '/images/illustrations/auth/v2-login-light-border.png',
    '/images/illustrations/auth/v2-login-dark-border.png'
  );

  // Mutation de connexion
  const [login, { isLoading, error }] = useLoginCreateMutation();

  // React Hook Form avec schéma de validation
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  // Toggle Afficher/Masquer le mot de passe
  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  // Soumission du formulaire
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await login({ tokenObtainPair: data }).unwrap();

      const decodedAcessToken = verifyToken(result.access);
      const decodedRefreshToken = verifyToken(result.refresh);

      // Obtenir l'heure d'expiration des tokens décodés
      const accessExpiryDate = new Date(decodedAcessToken.exp * 1000);
      const refreshExpiryDate = new Date(decodedRefreshToken.exp * 1000);

      // Définir les tokens dans les cookies avec les dates d'expiration
      Cookies.set('access_token', result.access, { expires: accessExpiryDate });
      Cookies.set('refresh_token', result.refresh, { expires: refreshExpiryDate });

      // Rediriger vers la page d'accueil après une connexion réussie
      router.push('/dashboard');
    } catch (err) {
      console.error('Échec de la connexion:', err);
    }
  };

  return (
    <div className="flex bs-full justify-center">
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden',
          { 'border-ie': settings.skin === 'bordered' }
        )}
      >
        <LoginIllustration src={characterIllustration} alt="illustration-personnage" />
        {!hidden && (
          <MaskImg
            alt="masque"
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div
        className="flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]"
      >
        <Link href='/home' className="absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]">
          <Logo />
        </Link>
        <div className="flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0">
          <div className="flex flex-col gap-1">
            <Typography variant="h4">{`Bienvenue sur ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Veuillez vous connecter à votre compte et commencer l&apos;aventure</Typography>
          </div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <CustomTextField
              autoFocus
              fullWidth
              label="Email"
              placeholder="Entrez votre email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <CustomTextField
              fullWidth
              label="Mot de passe"
              placeholder="············"
              type={isPasswordShown ? 'text' : 'password'}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={handleClickShowPassword} onMouseDown={(e) => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
            {error && (
              <Typography color="error">
                Échec de la connexion : {error && 'data' in error ? JSON.stringify(error.data) : 'Une erreur inattendue est survenue.'}
              </Typography>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginV2;
