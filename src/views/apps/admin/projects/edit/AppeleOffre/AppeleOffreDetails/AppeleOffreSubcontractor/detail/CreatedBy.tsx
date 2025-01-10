import type {ProjectLotSubcontractorRead} from "@/services/IsyBuildApi";
import CreatedByCard from '@/components/CreatedByCard'

type Props = {
  projectLotSubcontractorData: ProjectLotSubcontractorRead | undefined // Adjust the type as necessary
}


const CreatedBy: React.FC<Props> = ({ projectLotSubcontractorData }) => {
  // Vars

  return (
    <CreatedByCard createdBy={projectLotSubcontractorData?.created_by} created_at={projectLotSubcontractorData?.created_at} updated_at={projectLotSubcontractorData?.updated_at}/>

  )
}

export default CreatedBy
