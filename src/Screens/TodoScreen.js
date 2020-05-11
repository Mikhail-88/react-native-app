import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';
import { AppCard } from '../components/UI/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/UI/AppTextBold';
import { AppButton } from '../components/UI/AppButton';
import { TodoContext } from '../context/todo-context/todoContext';
import { ScreenContext } from '../context/screen-context/screenContext';

export const TodoScreen = () => {
  const { todos, removeTodo, updateTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const todo = todos.find(item => item.id === todoId);

  const saveHandler = title => {
    updateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={todo.title}
        onSave={saveHandler}
        visible={modal}
        onCancel={() => setModal(false)}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.btn}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name='back' size={20} color='#fff' />
          </AppButton>
        </View>
        <View style={styles.btn}>
          <AppButton 
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    width: Dimensions.get('window').width / 3
  },
  title: {
    fontSize: 21
  },
  card: {
    marginBottom: 20
  }
});