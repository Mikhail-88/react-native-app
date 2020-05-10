import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/Screens/MainScreen';
import { TodoScreen } from './src/Screens/TodoScreen';

const initialState = [
  {id: '1', title: 'First task'},
  {id: '2', title: 'Second task'},
  {id: '3', title: 'Third task'}
];

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState(initialState);

  const addTodo = title => {
    setTodos(prevState => [
      ...prevState, 
      {
        id: Date.now().toString(),
        title
      }
    ]);
  };

  const removeTodo = id => {
    const todo = todos.find(todo => todo.id === id);

    Alert.alert(
      'Remove Todo',
      `Do you want to delete ${todo.title} task?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { 
          text: 'Delete', 
          onPress: () => {
            setTodoId(null);
            setTodos(prevState => prevState.filter(item => item.id !== id));
          }
        }
      ],
      { cancelable: false }
    );
  };

  const saveEditTitle = (id, title) => {
    setTodos(prevState => prevState.map(
      todo => todo.id === id ? {...todo, title} : todo
    ));
  };

  let content = <MainScreen
                  todos={todos}
                  addTodo={addTodo}
                  removeTodo={removeTodo}
                  openTodo={setTodoId}
                />;

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId);
    content = <TodoScreen
                todo={selectedTodo}
                saveEditTitle={saveEditTitle}
                removeTodo={removeTodo}
                goBack={() => setTodoId(null)}
              />
  }

  return (
    <View>
      <Navbar title='Todo App' />

      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
