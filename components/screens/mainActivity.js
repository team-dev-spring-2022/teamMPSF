import React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {GET_TASKS} from '../gqls/tasks/queries';
import {useQuery} from '@apollo/client';

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFFFFF',
    height: '100%',
    width: '100%',
  },
  title: {
    marginTop: '5%',
    marginLeft: '10%',
    fontSize: 24,
    color: '#000000',
    marginBottom: '10%',
  },
  checkBoxText: {
    color: '#000000',
    fontSize: 17,
  },
  addButtonText: {
    color: '#9F9F9F',
    fontSize: 17,
  },
  checkBox: {
    marginBottom: '5%',
    width: '80%',
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  addButtonBox: {
    margin: 5,
    width: '80%',
    alignSelf: 'center',
  },
  box: {
    width: '5%',
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
  },
});

const MainActivity = () => {
  const {loading, error, data} = useQuery(GET_TASKS);

  if (loading) {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Today</Text>
        <ScrollView>
          <Text style={styles.buttonText}>Loading</Text>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Today</Text>
      <View>
        <ScrollView>
          {data.tasks.map(item => {
            return (
              <View key={item.id} style={styles.checkBox}>
                <TouchableOpacity style={styles.box} />
                {
                  // @todo #68 Доделать checkbox на главном экране
                }
                <Text style={styles.checkBoxText}>
                  {' ' + item.title} {item.description}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity style={styles.addButtonBox}>
            <Text style={styles.addButtonText}>+ Add task</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default MainActivity;
