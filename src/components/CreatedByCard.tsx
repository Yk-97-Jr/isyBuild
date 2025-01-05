// MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// Util Imports
import { getInitials } from '@/utils/getInitials';

export type CreatedByRead = {
  id: number;
  avatar: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

type CreatedByCardProps = {
  createdBy?: CreatedByRead;
  created_at?: string; // New prop
  updated_at?: string; // New prop
  showDetails?: boolean;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);

  return date.toLocaleString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getAvatar = (avatar?: string, email?: string) => {
  if (avatar) {
    return <Avatar src={avatar} />;
  }

  return <Avatar>{getInitials(email || '')}</Avatar>;
};

const CreatedByCard: React.FC<CreatedByCardProps> = ({
  createdBy,
  created_at,
  updated_at,
  showDetails = true,
}) => {
  if (!createdBy) {
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
          {getAvatar(createdBy.avatar, createdBy.email)}
          <div className="flex flex-col">
            <Typography color="text.primary" className="font-medium">
              {createdBy.first_name || ''} {createdBy.last_name || ''}
            </Typography>
            <Typography>{createdBy.email}</Typography>
          </div>
        </div>
        {showDetails && (
          <div className="flex flex-col gap-1">
            <Typography variant="subtitle2" className="font-medium">
              Plus de détails
            </Typography>
            <div className="flex items-center gap-2">
              <i className="tabler-clock-hour-4" />
              <Typography>Créé à:</Typography>
              <Typography>{formatDate(created_at)}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <i className="tabler-clock-hour-4" />
              <Typography>Mis à jour à:</Typography>
              <Typography>{formatDate(updated_at)}</Typography>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CreatedByCard;
