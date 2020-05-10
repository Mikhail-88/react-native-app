import React from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { TodoItem } from '../components/TodoItem';

export const MainScreen = ({
  todos, 
  addTodo, 
  removeTodo, 
  openTodo 
}) => {
  const noTodos = !todos.length && (
    <View style={styles.imageWrapper}>
      <Image 
        style={styles.image}
        source={require('../../assets/no-items.png')}
      />
      <Text style={styles.text}>Your tasks list is empty!</Text>
    </View>
  );

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {noTodos || (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={todos}
          renderItem={({ item }) => (
            <TodoItem todo={item} removeTodo={removeTodo} onOpen={openTodo} />
          )}
        />
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
