

// Util Imports

import CreatedByCard from '@/components/CreatedByCard'
import type { CreatedByRead} from '@/services/IsyBuildApi'

type SubcontractorEditProps = {
  subcontractorData?: CreatedByRead  // Adjust the type as necessary
  created_at?: string; 
  updated_at?: string;
}



// Vars

const SubcontractorCreatedBy: React.FC<SubcontractorEditProps> = ({ subcontractorData,created_at,updated_at }) => {
  // Vars
  
  return (
    <div>
    <CreatedByCard createdBy={subcontractorData} created_at={created_at} updated_at={updated_at}/>
  </div>
  )
}

export default SubcontractorCreatedBy
