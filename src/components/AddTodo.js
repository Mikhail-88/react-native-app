import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const pressHandler = () => {
    if (value.trim().length) {
      onSubmit(value);
      setValue('');
      Keyboard.dismiss();
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
      <AntDesign.Button onPress={pressHandler} name='pluscircleo'>
        Add
      </AntDesign.Button>
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
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
});
