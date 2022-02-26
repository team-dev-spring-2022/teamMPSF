import React from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {GET_TASKS} from '../gqls/tasks/queries';
import {useQuery} from '@apollo/client';

const styles = StyleSheet.create({
  scroll: {},
  buttonText: {},
});

const MainActivity = () => {
  // @todo #29 Добавить элементы главного экрана
  const {loading, error, data} = useQuery(GET_TASKS);
  // @todo #29 Добавить элементы главного экрана
  if (loading) {
    return (
      <ScrollView style={styles.scroll}>
        <Text style={styles.buttonText}>Loading</Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.scroll}>
      {data.tasks.map(item => {
        return (
          <View key={item.id} style={{alignSelf: 'center'}}>
            <Text style={styles.buttonText}>
              {item.title} {item.description}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default MainActivity;
