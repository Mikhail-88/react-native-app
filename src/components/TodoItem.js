import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { AppTextBold } from './UI/AppTextBold';

export const TodoItem = ({ todo, onRemoveTodo, onOpen }) => {
  const longPressHandler = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      onPress={() => onOpen(todo.id)}
      onLongPress={longPressHandler}
    >
      <View style={styles.todo}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  },
  title: {
    fontSize: 21
  }
});
