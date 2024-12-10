import React from 'react';

import { Card,  CardContent, Typography, Avatar } from '@mui/material';

import type { LotRead } from '@/services/IsyBuildApi';
import { getInitials } from '@/utils/getInitials';

// Helper function to format the date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  
return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to render an Avatar
const getAvatar = (params: { avatar: string; email: string }) => {
  const { avatar, email } = params;

  
return avatar ? <Avatar src={avatar} /> : <Avatar>{getInitials(email)}</Avatar>;
};

// SubcontractorCreatedBy Component
const LotsCreatedBy: React.FC<{ lotData: LotRead | undefined }> = ({ lotData }) => {
  if (!lotData) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Aucune information disponible
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <Typography variant="subtitle2" fontWeight="normal">
          Créé Par
        </Typography>
        <div className="flex items-center gap-3">
          {getAvatar({
            avatar: lotData.created_by?.avatar ?? '/images/avatars/1.png',
            email: lotData.created_by?.email ?? ''
          })}
          <div className="flex flex-col">
            <Typography color="text.primary" className="font-medium">
              {lotData.created_by?.first_name} {lotData.created_by?.last_name}
            </Typography>
            <Typography>{lotData.created_by?.email}</Typography>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Typography variant="subtitle2" className="font-medium mlb-2">
            Plus de détails
          </Typography>
          <div className="flex items-center gap-2 mlb-2">
            <i className="tabler-clock-hour-4" />
            <Typography>Créé à:</Typography>
            <Typography>{formatDate(lotData.created_at)}</Typography>
          </div>
          <div className="flex items-center gap-2 mlb-2">
            <i className="tabler-clock-hour-4" />
            <Typography>Mis à jour à:</Typography>
            <Typography>{formatDate(lotData.updated_at)}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LotsCreatedBy
