// Type Imports
import type {ChildrenType, Direction} from '@core/types'

// Context Imports
import {VerticalNavProvider} from '@menu/contexts/verticalNavContext'
import {SettingsProvider} from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'
import SnackBarContextProvider from "@/contexts/SnackBarContextProvider";
import ReduxProvider from "@/store/ReduxProvider";


// Util Imports
import {getMode, getSettingsFromCookie, getSystemMode} from '@core/utils/serverHelpers'
import {AuthProvider} from "@/contexts/AuthContext";

type Props = ChildrenType & {
  direction: Direction
}

const Providers = (props: Props) => {
  // Props
  const {children, direction} = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const systemMode = getSystemMode()

  return (
    <AuthProvider>
      <ReduxProvider>
        <VerticalNavProvider>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
            <ThemeProvider direction={direction} systemMode={systemMode}>
              <SnackBarContextProvider>{children}</SnackBarContextProvider>
            </ThemeProvider>
          </SettingsProvider>
        </VerticalNavProvider>
      </ReduxProvider>
    </AuthProvider>

  )
}

export default Providers
