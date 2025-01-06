import CreatedByCard from "@/components/CreatedByCard";
import type {ClientStaffRead} from "@/services/IsyBuildApi";

type UserEditProps = {
  userData: ClientStaffRead | undefined; // Adjust the type as necessary
};

const UserCreatedBy: React.FC<UserEditProps> = ({ userData }) => {
  return (
    <CreatedByCard createdBy={userData?.created_by} created_at={userData?.created_at} updated_at={userData?.updated_at}/>

  );
};

export default UserCreatedBy;
