import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const TodoItem = ({ todo, removeTodo, onOpen }) => {
  const longPressHandler = () => {
    removeTodo(todo.id);
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.5} 
      onPress={() => onOpen(todo.id)}
      onLongPress={longPressHandler}
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
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
  }
});
