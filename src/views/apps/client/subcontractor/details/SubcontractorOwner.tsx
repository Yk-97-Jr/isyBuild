import React from 'react';

import {useParams, useRouter} from "next/navigation";

import {Card, CardHeader, CardContent, Divider, Typography} from '@mui/material';

import Avatar from "@mui/material/Avatar";


import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";

import type {SubcontractorRead} from "@/services/IsyBuildApi";

import {useAuth} from "@/contexts/AuthContext";


type SubcontractorProprietaireProps = {
  subcontractorData: SubcontractorRead | undefined; // Adjust the type as necessary
};

const SubcontractorOwner: React.FC<SubcontractorProprietaireProps> = ({subcontractorData}) => {
  const router = useRouter();
  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {id} = useParams(); // Get clientId from route parameters


  const assignOwner = () => {
    router.push(`/${userRole}/subcontractor/${id}/details/assign-owner`);


  }


  return (
    <Card>
      <CardHeader title='propriétaire'/>
      <CardContent>
        <Divider className='mlb-2'/>
        {subcontractorData && subcontractorData.owner ? (
          <div className='flex items-center justify-between'>
            {/* Wrapper for the first two items with gap-2 */}
            <div className='flex items-center gap-2'>
              <Avatar alt={'User Avatar'} src='/images/avatars/1.png'/>
              <div className='flex items-start flex-col'>
                <>
                  <Typography className='font-medium' color='text.primary'>
                    {subcontractorData.owner.first_name} {subcontractorData.owner.last_name}
                  </Typography>
                  <Typography variant='caption'>
                    {subcontractorData.owner.email}
                  </Typography>
                </>
              </div>
            </div>
            {/* Space between text and button, applying gap-6 */}
            <div className='ml-12'>
              {/*<Button variant='contained' onClick={assignOwner}>*/}
              {/*  Modifier*/}
              {/*</Button>*/}
              <Tooltip title="Modifier" arrow>
                <IconButton color="secondary" aria-label="modify" onClick={assignOwner}>
                  <i className="tabler-pencil-cog"/>
                </IconButton>
              </Tooltip>

              <Tooltip title="Supprimer" arrow>
                <IconButton color="secondary" aria-label="delete" disabled>
                  <i className="tabler-trash"/>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between'>

            <Typography variant="body1" color="text.secondary">Aucune information disponible</Typography>
            <Tooltip title="Ajouter un propriétaire" arrow>
              <IconButton color="secondary" aria-label="delete" onClick={assignOwner}>
                <i className="tabler-plus"/>
              </IconButton>
            </Tooltip>
          </div>

        )}

      </CardContent>
    </Card>
  );
};

export default SubcontractorOwner;
