import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';

import { THEME } from '../theme';
import { AppCard } from '../components/UI/AppCard';
import { EditModal } from '../components/EditModal';

export const TodoScreen = ({ 
  todo, 
  removeTodo, 
  goBack, 
  saveEditTitle
}) => {
  const [modal, setModal] = useState(false);

  const saveHandler = title => {
    saveEditTitle(todo.id, title);
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
        <Text style={styles.title}>{todo.title}</Text>
        <Button 
          title='Edit' 
          onPress={() => setModal(true)}
        />
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.btn}>
          <Button 
            title='Back' 
            color={THEME.GREY_COLOR}
            onPress={goBack}
          />
        </View>
        <View style={styles.btn}>
          <Button 
            title='Delete' 
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          />
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
    width: '40%'
  },
  title: {
    fontSize: 21
  },
  card: {
    marginBottom: 20
  }
});