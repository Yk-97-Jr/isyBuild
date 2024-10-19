// Component Imports

// Server Action Imports
import {getServerMode} from '@core/utils/serverHelpers'
import SetPassword from "@views/SetPassword";

const ResetPasswordV2Page = () => {
  // Vars
  const mode = getServerMode()

  return <SetPassword mode={mode}/>
}

export default ResetPasswordV2Page
