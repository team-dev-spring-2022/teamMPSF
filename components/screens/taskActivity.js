import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {GET_TASKS} from '../gqls/tasks/queries';
import {UTASK} from '../gqls/tasks/mutations';

const styles = StyleSheet.create({
  addButtonText: {
    color: '#9F9F9F',
    fontSize: 17,
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
    textAlign: 'center',
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
    textAlign: 'center',
  },
});

const TaskActivity = ({props, open, onClose}) => {
  const {refetch} = useQuery(GET_TASKS);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const setData = () => {
      setDescription(props.description);
      setTitle(props.title);
      setId(props.taskId);
    };
    setData();
  }, [props.description, props.title, props.taskId]);

  const [upd] = useMutation(UTASK, {
    onCompleted: () => {
      console.log('Успешно обновлен');
    },
    onError: ({message}) => {
      console.log(message);
    },
  });

  const updateTask = date => {
    upd({
      variables: {
        id,
        title,
        description,
        date,
      },
      onCompleted: refetch,
    });
  };

  const saveHandle = () =>
    Alert.alert('', 'Save changes?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => updateTask(new Date().getTime())},
    ]);

  return (
    <Modal visible={open} transparent={true}>
      <View style={styles.modalBack}>
        <View style={styles.modalFront}>
          <View style={styles.textBoxTitle}>
            <TextInput
              style={styles.textBoxText}
              onChangeText={text => {
                setTitle(text);
              }}>
              {props.title}
            </TextInput>
          </View>
          <View style={styles.textBoxDes}>
            <TextInput
              style={styles.textBoxText}
              onChangeText={text => {
                setDescription(text);
              }}
              multiline={true}>
              {props.description}
            </TextInput>
          </View>
          <TouchableOpacity
            style={styles.label}
            onPress={() => {
              saveHandle();
            }}>
            <Text style={styles.labelText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.label} onPress={onClose}>
            <Text style={styles.labelText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaskActivity;
