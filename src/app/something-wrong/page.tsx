// Component Imports
import Providers from '@components/Providers';
import BlankLayout from '@layouts/BlankLayout';
import SomethingWrong from '@views/SomethingWrong';

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers';

const SomethingWrongPage = () => {
  // Vars
  const direction = 'ltr';
  const mode = getServerMode();
  const systemMode = getSystemMode();

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <SomethingWrong mode={mode} />
      </BlankLayout>
    </Providers>
  );
};

export default SomethingWrongPage;
