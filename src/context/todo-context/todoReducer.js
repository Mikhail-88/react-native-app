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

const handlers = {
  [ADD_TODO]: (state, action) => ({
    ...state, 
    todos: [
      ...state.todos, 
      {
        id: action.id,
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
  [FETCH_TODOS]: (state, action) => ({...state, todos: action.todos}),
  [SHOW_LOADER]: state => ({...state, isLoading: true}),
  [HIDE_LOADER]: state => ({...state, isLoading: false}),
  [SHOW_ERROR]: (state, action) => ({...state, error: action.error}),
  [CLEAR_ERROR]: state => ({...state, error: null}),
  DEFAULT: state => state
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  
  return handler(state, action);
};