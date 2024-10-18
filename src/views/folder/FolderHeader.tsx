import React from 'react';

import Link from "next/link";

import Button from '@mui/material/Button';

import Logo from "@components/layout/shared/Logo";


const FolderHeader = () => {
  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Link href='/home'>
          <Logo/>
        </Link>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='contained'>
          Connexion
        </Button>
      </div>
    </div>
  );
};

export default FolderHeader;
