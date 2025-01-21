import React from 'react';

import {Card, CardHeader, CardContent, Typography, Chip, Box,} from '@mui/material';

import IconButton from "@mui/material/IconButton";

import type { StatusE51Enum, Type94BEnum,DocumentRead} from '@/services/IsyBuildApi';
import {getStatus, getStatusProps} from "@/utils/statusHelper";
import { StatusE51Mapping, Type474Mapping} from "@/utils/statusEnums";

type DocDiffTypeAndLotProps = {
  title?: string;
  phase?: string;
  type?: string; // Document type
  lot?: string;  // Project lot
  date?: string | null;
  indice?: string | null;
  status?: string;
  DocumentDocDiffData: DocumentRead | undefined;
  localisation?: string | undefined

};

const DocDiffTypeAndLotInfo: React.FC<DocDiffTypeAndLotProps> = ({
                                                                   title,
                                                                   phase,
                                                                   type,
                                                                   lot,
                                                                   date,
                                                                   indice,
                                                                   DocumentDocDiffData,
                                                                   status,
                                                                   localisation
                                                                 }) => {

  const {
    label,
    color
  } = getStatusProps<StatusE51Enum>(status as any, StatusE51Mapping);


  console.log(type)

  const {
    label:labelType,
    color:colorType
  } = getStatus<Type94BEnum>(type as any, Type474Mapping);


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
      <CardHeader title="Informations du Document"/>
      <CardContent className='flex flex-col gap-[1.638rem]'>
        {title && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">

                  <Typography variant="body1" mr={2}>
                    Titre :
                  </Typography>
                </Box>
              </div>
              <Typography variant="body1" mr={2}>
                {title}
              </Typography>
            </div>
          </div>
        )}
        {/* Display Project Lot */}
        {phase && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">

                  <Typography variant="body1" mr={2}>
                    Phase :
                  </Typography>
                </Box>
              </div>
              <Typography variant="body1" mr={2}>
                {phase}
              </Typography>
            </div>
          </div>
        )}
        {/* Display Project Lot */}
        {type && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">

                  <Typography variant="body1" mr={2}>
                    Type :
                  </Typography>
                </Box>
              </div>
              <Chip label={labelType} color={colorType as any} variant='tonal'/>
            </div>
          </div>
        )}
        {/* Display Project Lot */}

        {lot && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">
                  <Typography variant="body1">
                    Lot :
                  </Typography>
                </Box>
              </div>
              <Typography variant="subtitle1" ml={2}>
                {lot}
              </Typography>
            </div>
          </div>
        )}

        {status ? (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">
                  <Typography variant="body1">
                    Statut:
                  </Typography>
                </Box>
              </div>
              <Typography variant="subtitle1" ml={2}>
                <Chip label={label} color={color as any} variant='tonal'/>
              </Typography>
            </div>
          </div>
        ) : <Typography variant="body1" color="textSecondary">
          Aucune information disponible
        </Typography>}
        {date && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">
                  <Typography variant="body1">
                    Date De Diffusion:
                  </Typography>
                </Box>
              </div>
              <Typography variant="subtitle1" ml={2}>
                {date}
              </Typography>
            </div>
          </div>
        )}

        {indice ? (
            <div className='flex items-center gap-4'>

              <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
                <div className='flex flex-col'>
                  <Typography variant="body1">
                    Indice:
                  </Typography>
                </div>
                <Typography variant="subtitle1" ml={2}>
                  {indice}
                </Typography>
              </div>

            </div>
          ) :
          <Box display="flex" alignItems="center" className="mb-1">

            <Typography variant="body1" color="textSecondary">
              Aucune information disponible
            </Typography>
          </Box>
        }
        {DocumentDocDiffData ? (
            <div className='flex items-center gap-4'>

              <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
                <div className='flex flex-col'>
                  <Typography variant="body1">
                    Document:
                  </Typography>
                </div>
                <IconButton
                  onClick={() => openOrDownloadFile(DocumentDocDiffData?.latest_version.file_url)}>
                  <i className='tabler-download text-textSecondary'/>
                </IconButton>
              </div>

            </div>
          ) :
          <Box display="flex" alignItems="center" className="mb-1">

            <Typography variant="body1" color="textSecondary">
              Aucune information disponible
            </Typography>
          </Box>
        }
        {localisation && (
          <div className='flex items-center gap-4'>
            <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
              <div className='flex flex-col'>
                <Box display="flex" alignItems="center" className="mb-1">

                  <Typography variant="body1" mr={2}>
                    Localisation :
                  </Typography>
                </Box>
              </div>
              <Typography variant="body1" mr={2}>
                {localisation}
              </Typography>
            </div>
          </div>
        )}

        {/* Handle case where no data is available */}
        {!type && !lot && (
          <Typography variant="body1" color="textSecondary">
            Aucune information disponible
          </Typography>
        )}


      </CardContent>
    </Card>
  );
};

export default DocDiffTypeAndLotInfo;
