import type { DocumentDiffusionRead } from '@/services/IsyBuildApi'
import CreatedByCard from '@/components/CreatedByCard'

type SubcontractorEditProps = {
  docDiffData: DocumentDiffusionRead | undefined // Adjust the type as necessary
}


const DocDiffCreatedBy: React.FC<SubcontractorEditProps> = ({ docDiffData }) => {
  // Vars

  return (
    <CreatedByCard createdBy={docDiffData?.created_by} created_at={docDiffData?.created_at} updated_at={docDiffData?.updated_at}/>

  )
}

export default DocDiffCreatedBy
