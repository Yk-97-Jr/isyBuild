// Component Imports

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import ResetPassword from "@views/ResetPassword";

const ResetPasswordV2Page = () => {
  // Vars
  const mode = getServerMode()

  return <ResetPassword mode={mode} />
}

export default ResetPasswordV2Page
