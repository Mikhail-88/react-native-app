import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen-context/screenContext';

const initialState = {
  todos: [
    {id: '1', title: 'First task'},
    {id: '2', title: 'Second task'},
    {id: '3', title: 'Third task'}
  ]
};

export const TodoState = ({ children }) => {
  const { changeScreen } = useContext(ScreenContext);

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = title => dispatch({ type: ADD_TODO, title });

  const removeTodo = id => {
    const todo = state.todos.find(item => item.id === id);

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
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      addTodo,
      removeTodo,
      updateTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};