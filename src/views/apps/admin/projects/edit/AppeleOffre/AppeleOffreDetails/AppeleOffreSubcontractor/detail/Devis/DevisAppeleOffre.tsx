'use client';

// MUI Imports
import React from "react";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import {Button} from "@mui/material";

import type {ProjectLotSubcontractorRead} from "@/services/IsyBuildApi";
import OptionMenu from "@core/components/option-menu";

// Type imports for form handling
type Props = {
  projectLotSubcontractorData: ProjectLotSubcontractorRead | undefined; // Adjust the type as necessary
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>; // This will be used to control a boolean state
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>; // This will be used to control a boolean state
  setOpenModify: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number>>; // This will be used to control a boolean state


};

const DevisAppeleOffre: React.FC<Props> = ({
                                             projectLotSubcontractorData,
                                             setOpenAdd,
                                             setId,
                                             setOpenDelete,
                                             setOpenModify
                                           }) => {

  const handleAdd = () => {
    setOpenAdd(true)
  }

  const handleDelete = (id: number) => {
    setOpenDelete(true)
    setId(id)
  }

  const handleHistory = (id: number) => {
    console.log(id)

  }

  const handleEdit = (id: number) => {
    setOpenModify(true)
    setId(id)

    console.log(id)

  }


  const openOrDownloadFile = (fileUrl: string) => {
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

    // List of file types that can be viewed in the browser
    const viewableTypes = ['pdf', 'jpg', 'jpeg', 'png', 'txt', 'html', 'gif'];

    if (fileExtension && viewableTypes.includes(fileExtension)) {
      // Open in new tab if it's a viewable file type
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If it's not viewable, force download
      const link = document.createElement('a');

      link.href = fileUrl;
      link.setAttribute('download', fileUrl.split('/').pop() || 'file');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };


  return (
    <Card>
      {projectLotSubcontractorData?.devis_document ? (
        <div>
          <CardHeader title='Devis' action={
            <OptionMenu
              iconButtonProps={{size: 'medium'}}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Modifier',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleEdit(projectLotSubcontractorData?.id)
                  }
                },
                {
                  text: 'Historique',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleHistory(projectLotSubcontractorData?.devis_document.id)
                  }
                },
                {
                  text: 'Supprimer',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleDelete(projectLotSubcontractorData?.devis_document.id)
                  }
                }
              ]}
            />
          }/>
          <CardContent>
            <Grid container spacing={6} className='mbe-6'>
              <List sx={{width: '100%', bgcolor: 'background.paper'}}>

                <ListItem
                  disableGutters
                  secondaryAction={
                    <div>
                      {/* Second Icon Button */}
                      <IconButton
                        onClick={() => openOrDownloadFile(projectLotSubcontractorData?.devis_document.latest_version.file_url)}>
                        <i className='tabler-download text-textSecondary'/>
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemText primary={`${projectLotSubcontractorData?.devis_document?.name ?? 'Devis'}`}/>
                </ListItem>

              </List>
            </Grid>
          </CardContent>
        </div>
      ) : (
        <div>
          <CardHeader title='Devis'/>
          <CardContent>
            <Grid container spacing={6} className='mbe-6'>
              <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                <ListItem
                  disableGutters
                  secondaryAction={
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleAdd}
                      >
                        Ajouter
                      </Button>
                    </div>
                  }
                >
                  <ListItemText primary={`Ajouter un fichier devis`}/>
                </ListItem>

              </List>
            </Grid>
          </CardContent>
        </div>)}
    </Card>
  );
};

export default DevisAppeleOffre;
