

import type { SubcontractorStaffRead } from '@/services/IsyBuildApi'
import CreatedByCard from '@/components/CreatedByCard'

type SubcontractorEditProps = {
  subcontractorData: SubcontractorStaffRead | undefined // Adjust the type as necessary
}



// Vars

const SubcontractorCreatedBy: React.FC<SubcontractorEditProps> = ({ subcontractorData }) => {
  // Vars

  return (
    <div>
    <CreatedByCard createdBy={subcontractorData?.created_by} created_at={subcontractorData?.created_at} updated_at={subcontractorData?.updated_at}/>
  </div>
  )
}

export default SubcontractorCreatedBy
