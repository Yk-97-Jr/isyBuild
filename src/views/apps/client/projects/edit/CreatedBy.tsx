import type {ProjectRead} from "@/services/IsyBuildApi";
import CreatedByCard from '@/components/CreatedByCard'

type Props = {
  projectState: ProjectRead | undefined // Adjust the type as necessary
}


const CreatedBy: React.FC<Props> = ({ projectState }) => {
  // Vars

  return (
    <CreatedByCard createdBy={projectState?.created_by} created_at={projectState?.created_at} updated_at={projectState?.updated_at}/>

  )
}

export default CreatedBy
