import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { 
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODOS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR
} from '../types';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ScreenContext } from '../screen-context/screenContext';
import { ApiCall } from '../../api-call';

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    isLoading: false,
    error: null
  };

  const { changeScreen } = useContext(ScreenContext);

  const [state, dispatch] = useReducer(todoReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const addTodo = async title => {
    clearError();
    try {
      const data = await ApiCall.post(
        'https://rn-todo-app-57059.firebaseio.com/todos.json',
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (error) {
      showError(error.message);
    }
  };

  const removeTodo = id => {
    const todo = state.todos.find(item => item.id === id);

    Alert.alert(
      'Delete Todo?',
      `Do you want to delete "${todo.title}" task?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { 
          text: 'Delete', 
          onPress: async () => {
            clearError();
            try {
              await ApiCall.delete(`https://rn-todo-app-57059.firebaseio.com/todos/${id}.json`);
              changeScreen(null);
              dispatch({ type: REMOVE_TODO, id });
            } catch (error) {
              showError(error.message);
            } 
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await ApiCall.patch(
        `https://rn-todo-app-57059.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (error) {
      showError(error.message);
    }
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await ApiCall.get('https://rn-todo-app-57059.firebaseio.com/todos.json');
      const todos = Object.keys(data || {}).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError(error.message);
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      isLoading: state.isLoading,
      error: state.error,
      fetchTodos,
      addTodo,
      removeTodo,
      updateTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};