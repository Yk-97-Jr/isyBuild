import React from 'react'
 
import type {SubcontractorStaffRead} from "@/services/IsyBuildApi";

import CreatedByCard from '@/components/CreatedByCard';

type UserEditProps = {
  userStaffData: SubcontractorStaffRead | undefined; // Adjust the type as necessary
};

const UserStaffCreatedBy: React.FC<UserEditProps> = ({ userStaffData }) => {
  return (
    <CreatedByCard createdBy={userStaffData?.created_by} created_at={userStaffData?.created_at} updated_at={userStaffData?.updated_at}/>

  )
}
        

export default UserStaffCreatedBy;
