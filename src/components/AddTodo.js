import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native';

import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim().length) {
      onSubmit(value);
      setValue('');
    } else {
      Alert.alert('You can not add an empty field to the list.')
    }
  };

  return (
    <View style={styles.block}>
      <TextInput 
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder='Enter your task...'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <Button 
        title='Add'
        onPress={pressHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});
