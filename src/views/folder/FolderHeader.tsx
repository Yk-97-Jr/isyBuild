import React from 'react';

import Link from "next/link";

import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';

import Logo from "@components/layout/shared/Logo";


const FolderHeader = () => {
  const router = useRouter();

  const handleLogin = () => {
    // Navigate to the login page
    router.push('/login'); // Change '/login' to the path of your login page
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Link href='/home'>
          <Logo/>
        </Link>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='contained' onClick={handleLogin}>
          Connexion
        </Button>
      </div>
    </div>
  );
};

export default FolderHeader;
