import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardHeader, CardContent } from '@mui/material';

import MediaDialog from '@components/dialogs/media-dialog'; // Import the MediaDialog component


type ProductMediaGridProps = {
  media: {
    id: number;
    image: string;
  }[];
  refetchProduct: () => void; // Function to refetch product data
  onMediaUploadSuccess: (newMediaId: number) => void; // Callback for new media
};

const ProductMediaGrid: React.FC<ProductMediaGridProps> = ({ media, refetchProduct}) => {

  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const [selectedMediaId, setSelectedMediaId] = useState<number >(0); // State to store selected media ID
  const [localMedia, setLocalMedia] = useState(media);

  useEffect(() => {
    
    setLocalMedia(media); // Update local media if media changes
  }, [media]);

  

  

  const handleOpenDialog = (id: number) => {
    setSelectedMediaId(id); // Set the ID of the media to delete
    setDialogOpen(true); // Open the dialog
  };

  
  if (!media || media.length === 0) {
    return (
      <Card
        sx={{
          borderRadius: 2,
          padding: 2,
        }}
      >
        <CardHeader title="Produit Image" />
        <CardContent>
          <Typography variant="subtitle1" color="text.disabled" textAlign="center">
            No media available for this product.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader title="Produit Image" />
        <CardContent>
          <Box>
            <Grid container spacing={2}>
              {localMedia.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'stretch',
                      alignItems: 'center',
                      position: 'relative',
                      border: '2px solid #ddd',
                      borderRadius: 2,
                      overflow: 'hidden',
                      '&:hover': {
                        '& .delete-icon': {
                          opacity: 1,
                        },
                      },
                      width: 200,
                      height: 200,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={`Media ${item.id}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <IconButton
                      color="error"
                      onClick={() => handleOpenDialog(item.id)}
                      aria-label="Delete media"
                      className="delete-icon"
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        opacity: 0,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      <i className="tabler-trash text-xl" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog for deleting media */}
      <MediaDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        id={selectedMediaId } // Pass the selected media ID
        setId={setSelectedMediaId}
        refetch={refetchProduct} // Refetch product data on delete
      />
    </>
  );
};

export default ProductMediaGrid;
