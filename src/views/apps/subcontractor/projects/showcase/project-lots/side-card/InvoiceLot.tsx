'use client';

// MUI Imports
import React from "react";

import { useParams } from "next/navigation";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import {Button} from "@mui/material";

import type {DocumentRead} from "@/services/IsyBuildApi";
import OptionMenu from "@core/components/option-menu";


// Type imports for form handling
type Props = {
  projectLotDevisData: DocumentRead  | undefined// Adjust the type as necessary
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>; // This will be used to control a boolean state
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>; // This will be used to control a boolean state
  setOpenModify: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<number | undefined>>; // This will be used to control a boolean state
  refetch: () => void;


};

const InvoiceLot: React.FC<Props> = ({
                                             projectLotDevisData,
                                             setOpenAdd,
                                             setId,
                                             setOpenDelete,
                                             setOpenModify,
                                             setOpenHistory,
                                             refetch

                                           }) => {

  const handleAdd = () => {
    setOpenAdd(true)
  }

  const handleDelete = (id: number) => {
    setOpenDelete(true)
    setId(id)
  }

  const handleHistory = (id: number) => {
    setOpenHistory(true)
    setId(id)
    console.log("kkkkkkk",projectLotDevisData)

  }

  const handleEdit = (id: number) => {
    setOpenModify(true)
    setId(id)
    refetch()
    console.log("id=", id);
    
    console.log(projectLotDevisData)

  }

  const { docId}= useParams()


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
      {projectLotDevisData && projectLotDevisData.id? (
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
                    onClick: () => handleEdit(+docId)
                  }
                },
                {
                  text: 'Historique',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleHistory(projectLotDevisData?.id)
                  }
                },
                {
                  text: 'Supprimer',
                  menuItemProps: {
                    className: 'flex items-center gap-1 text-textSecondary',
                    onClick: () => handleDelete(projectLotDevisData?.id)
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
                        onClick={() => openOrDownloadFile(projectLotDevisData?.latest_version.file_url)}>
                        <i className='tabler-download text-textSecondary'/>
                      </IconButton>
                    </div>
                  }
                >
                  <ListItemText primary={`${projectLotDevisData?.name || 'Devis Name'}`}/>
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

export default InvoiceLot;
