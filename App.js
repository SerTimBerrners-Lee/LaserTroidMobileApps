import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping, dark as liteTheme } from '@eva-design/eva';
import { AppNavigator } from './component/navigation.component';

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={liteTheme}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);

export default App;