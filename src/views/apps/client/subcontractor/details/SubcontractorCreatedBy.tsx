import type { SubcontractorRead } from '@/services/IsyBuildApi'
import CreatedByCard from '@/components/CreatedByCard'

type SubcontractorEditProps = {
  subcontractorData: SubcontractorRead | undefined // Adjust the type as necessary
}

const SubcontractorCreatedBy: React.FC<SubcontractorEditProps> = ({ subcontractorData }) => {
  // Vars

  return (
    <CreatedByCard createdBy={subcontractorData?.created_by} created_at={subcontractorData?.created_at} updated_at={subcontractorData?.updated_at}/>

  )
}

export default SubcontractorCreatedBy