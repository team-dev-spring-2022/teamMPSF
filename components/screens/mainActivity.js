import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {GET_TASKS} from '../gqls/tasks/queries';
import {useQuery} from '@apollo/client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {add} from 'react-native-reanimated';

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
  modalBack: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFront: {
    backgroundColor: 'white',
    width: '80%',
    height: '70%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxTitle: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  textBoxDes: {
    height: '50%',
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  textBoxText: {
    color: '#000000',
    fontSize: 17,
  },
  label: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    marginHorizontal: 40,
    backgroundColor: '#323232',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
});

const MainActivity = () => {
  const {loading, error, data} = useQuery(GET_TASKS);
  const [addNew, setAddNew] = useState(false);
  const [checked, setCheck] = useState(new Array(999).fill(false));

  const handleOnChange = position => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item,
    );

    setCheck(updatedCheckedState);
  };
  // @todo #29 Добавить элементы главного экрана
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
          {data.tasks.map((item, index) => {
            return (
              <View key={item.id} style={styles.checkBox}>
                <Text style={styles.checkBoxText}>
                  {!checked[index] && (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      color={'black'}
                      size={20}
                      onPress={() => {
                        handleOnChange(index);
                      }}
                    />
                  )}
                  {!!checked[index] && (
                    <MaterialCommunityIcons
                      name="checkbox-marked"
                      color={'black'}
                      size={20}
                      onPress={() => {
                        handleOnChange(index);
                      }}
                    />
                  )}
                  {' ' + item.title} {item.description}
                </Text>
              </View>
            );
          })}
          <TouchableOpacity
            style={styles.addButtonBox}
            onPress={() => {
              setAddNew(!addNew);
            }}>
            <Text style={styles.addButtonText}>+ Add task</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal visible={addNew} transparent={true}>
        <View style={styles.modalBack}>
          <View style={styles.modalFront}>
            <View style={styles.textBoxTitle}>
              <TextInput style={styles.textBoxText} placeholder="Заголовок" />
            </View>
            <View style={styles.textBoxDes}>
              <TextInput
                style={styles.textBoxText}
                multiline={true}
                placeholder="Описание"
              />
            </View>
            <TouchableOpacity
              style={styles.label}
              onPress={() => {
                setAddNew(!addNew);
              }}>
              <Text style={styles.addButtonText}>+ Add task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MainActivity;
