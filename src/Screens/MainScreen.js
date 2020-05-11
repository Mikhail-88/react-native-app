import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';
import { AppText } from '../components/UI/AppText';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo-context/todoContext';
import { ScreenContext } from '../context/screen-context/screenContext';

export const MainScreen = () => {
  const { todos, addTodo, removeTodo } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const getWindowWidth = () => Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
  const [deviceWidth, setDeviceWidth] = useState(getWindowWidth());

  useEffect(() => {
    const update = () => {
      const width = getWindowWidth();
      setDeviceWidth(width);
    };

    Dimensions.addEventListener('change', update);

    return () => {
      Dimensions.removeEventListener('change', update);
    };
  });
  
  const noTodos = !todos.length && (
    <View style={styles.imageWrapper}>
      <Image 
        style={styles.image}
        source={require('../../assets/no-items.png')}
      />
      <AppText style={styles.text}>Your tasks list is empty!</AppText>
    </View>
  );

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {noTodos || (
        <View style={{ width: deviceWidth }}>
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({ item }) => (
              <TodoItem 
                todo={item} 
                onRemoveTodo={removeTodo} 
                onOpen={changeScreen}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  text: {
    fontSize: 19,
    marginTop: 10
  }
});
