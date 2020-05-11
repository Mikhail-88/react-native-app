import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo-context/TodoState';
import { ScreenState } from './src/context/screen-context/ScreenState';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={() => Alert.alert('Something went wrong, try again later!')}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
};