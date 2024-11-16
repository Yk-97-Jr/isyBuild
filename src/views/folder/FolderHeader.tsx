import React from 'react';

import Link from "next/link";

import {useRouter} from 'next/navigation';

import IconButton from '@mui/material/IconButton'

import Button from '@mui/material/Button';

import Cookies from "js-cookie";

import Logo from "@components/layout/shared/Logo";
import {useAuth} from "@/contexts/AuthContext";


const FolderHeader = () => {
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role

  const handleLogin = () => {
    // Navigate to the login page
    router.push('/login'); // Change '/login' to the path of your login page
  }

  const handleDash = () => {
    // Navigate to the login page
    router.push(`/${userRole}/dashboard`);
  }

  const token = Cookies.get('access_token')
  const isTokenValid = token != null; // Check if token exists

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Link href='/home'>
          <Logo/>
        </Link>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        {isTokenValid ? (

          <IconButton
            onClick={handleDash} // Navigating to the home page
            color="primary" // You can change the color based on your design preference
            sx={{ fontSize: 30 }}
          >
            <i className="tabler-home text-primary"/> {/* Tabler Home icon */}
          </IconButton>
        ) : (

          // If token is not valid, show the "Login" button
          <Button variant='contained' onClick={handleLogin}>
            Connexion
          </Button>
        )}
      </div>
    </div>
  );
};

export default FolderHeader;
