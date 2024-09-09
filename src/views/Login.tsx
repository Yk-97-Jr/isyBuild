'use client';

// React Imports
import { useState } from 'react';

// Next Imports
import { useRouter } from 'next/navigation';

// MUI Imports
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

// Third-party Imports
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link';
import Logo from '@components/layout/shared/Logo';
import CustomTextField from '@core/components/mui/TextField';

// Config Imports
import themeConfig from '@configs/themeConfig';

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant';
import { useSettings } from '@core/hooks/useSettings';

// Mutation Imports
import { useLoginCreateMutation } from '@/services/IsyBuildApi';
import { verifyToken } from '@/utils/verifyToken';

// Styled Custom Components
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

// Yup validation schema
const schema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
}).required();

const LoginV2 = ({ mode }: { mode: 'light' | 'dark' }) => {
  // States
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

  // Login Mutation
  const [login, { isLoading, error }] = useLoginCreateMutation();

  // React Hook Form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  // Show/Hide Password toggle
  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  // Form Submission
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const result = await login({ tokenObtainPair: data }).unwrap();

      const decodedAcessToken = verifyToken(result.access);
      const decodedRefreshToken = verifyToken(result.refresh);

      // Get the expiration time from the decoded tokens
      const accessExpiryDate = new Date(decodedAcessToken.exp * 1000);
      const refreshExpiryDate = new Date(decodedRefreshToken.exp * 1000);

      // Set tokens in cookies with expiration dates
      Cookies.set('access_token', result.access, { expires: accessExpiryDate });
      Cookies.set('refresh_token', result.refresh, { expires: refreshExpiryDate });

      // Redirect to the home page after successful login
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to login:', err);
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
        <LoginIllustration src={characterIllustration} alt="character-illustration" />
        {!hidden && (
          <MaskImg
            alt="mask"
            src={authBackground}
            className={classnames({ 'scale-x-[-1]': theme.direction === 'rtl' })}
          />
        )}
      </div>
      <div
        className="flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]"
      >
        <Link  href='/home' className="absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]">
          <Logo  />
        </Link>
        <div className="flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0">
          <div className="flex flex-col gap-1">
            <Typography variant="h4">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
            <Typography>Please sign-in to your account and start the adventure</Typography>
          </div>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <CustomTextField
              autoFocus
              fullWidth
              label="Email"
              placeholder="Enter your email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <CustomTextField
              fullWidth
              label="Password"
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
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            {error && (
              <Typography color="error">
                Login failed: {error && 'data' in error ? JSON.stringify(error.data) : 'An unexpected error occurred.'}
              </Typography>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginV2;
