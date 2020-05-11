import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Navbar } from './components/Navbar';
import { MainScreen } from './Screens/MainScreen';
import { TodoScreen } from './Screens/TodoScreen';
import { THEME } from './theme';
import { ScreenContext } from './context/screen-context/screenContext';

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <View>
      <Navbar title='Todo App' />

      <View style={styles.container}>
        { todoId ? <TodoScreen /> : <MainScreen /> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});
