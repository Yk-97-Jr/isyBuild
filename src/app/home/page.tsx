// Component Imports
import LandingPageWrapper from '@views/front-pages/home'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const LandingPage = () => {
  // Vars
  const mode = getServerMode()

  return <LandingPageWrapper mode={mode} />
}

export default LandingPage
