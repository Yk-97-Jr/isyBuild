

import CreatedByCard from "@/components/CreatedByCard";
import type {CreatedByRead, UserRead} from "@/services/IsyBuildApi";


type UserEditProps = {
  userData: UserRead ; // Adjust the type as necessary
};


const UserCreatedBy: React.FC<UserEditProps> = ({ userData }) => {
  const createdBy: CreatedByRead = {
    
    id: userData?.id,
    avatar: userData?.avatar,
    email: userData?.email,
    first_name: userData?.first_name,
    last_name: userData?.last_name,
  };
  
  return (
    <CreatedByCard createdBy={createdBy} created_at={userData?.date_joined} />

  )
};

export default UserCreatedBy;
