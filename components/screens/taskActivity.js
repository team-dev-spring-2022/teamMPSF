import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
} from 'react-native';
import {useMutation, useQuery} from '@apollo/client';
import {GET_TASKS} from '../gqls/tasks/queries';
import {UTASK} from '../gqls/tasks/mutations';
import DatePicker from 'react-native-date-picker';

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
    height: '80%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBoxTitle: {
    height: 40,
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  textBoxDes: {
    height: 280,
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
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
    marginTop: 20,
    alignSelf: 'center',
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
  const [date, setDate] = useState(new Date());
  const [openDate, setOpen] = useState(false);

  useEffect(() => {
    const setData = () => {
      setDescription(props.description);
      setTitle(props.title);
      setId(props.taskId);
      setDate(new Date(props.date));
    };
    setData();
  }, [props.description, props.title, props.taskId, props.date]);

  const [upd] = useMutation(UTASK, {
    onCompleted: () => {
      console.log('Успешно обновлен');
    },
    onError: ({message}) => {
      console.log(message);
    },
  });

  const updateTask = () => {
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
    <Modal visible={open} transparent={true} animationType="fade">
      <View style={styles.modalBack}>
        <View style={styles.modalFront}>
          <ScrollView style={{width: '100%'}}>
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

            <View style={styles.textBoxTitle}>
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}>
                <Text style={styles.textBoxText}>
                  {date.toISOString().split('T')[0] + ' '}
                  {date.toISOString().split('T')[1].split(':')[0] +
                    ':' +
                    date.toISOString().split('T')[1].split(':')[1]}
                </Text>
              </TouchableOpacity>
            </View>
            <DatePicker
              modal
              open={openDate}
              date={date}
              locale="ru"
              is24hourSource="locale"
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
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
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TaskActivity;
