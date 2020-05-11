import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';

const handlers = {
  [ADD_TODO]: (state, action) => ({
    ...state, 
    todos: [
      ...state.todos, 
      {
        id: Date.now().toString(),
        title: action.title
      }
    ]
  }),
  [REMOVE_TODO]: (state, action) => ({
    ...state, 
    todos: state.todos.filter(todo => todo.id !== action.id)
  }),
  [UPDATE_TODO]: (state, action) => ({
    ...state, 
    todos: state.todos.map(
      todo => todo.id === action.id ? {...todo, title: action.title} : todo
    )
  }),
  DEFAULT: state => state
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};