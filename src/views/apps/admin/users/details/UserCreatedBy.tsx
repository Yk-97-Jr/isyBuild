import React from 'react';


import type {AdminStaffRead} from "@/services/IsyBuildApi";
import CreatedByCard from '@/components/CreatedByCard';

type UserEditProps = {
  userData: AdminStaffRead | undefined; // Adjust the type as necessary
};



const UserCreatedBy: React.FC<UserEditProps> = ({ userData }) => {
  return (
    <div>
    <CreatedByCard createdBy={userData?.created_by} created_at={userData?.created_at} updated_at={userData?.updated_at}/>
  </div>
  );
};

export default UserCreatedBy;
