import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {NTASK} from '../gqls/tasks/mutations';
import {GET_TASKS} from '../gqls/tasks/queries';
import {useMutation, useQuery} from '@apollo/client';
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

const ModalActivity = ({open, onClose, props}) => {
  const {refetch} = useQuery(GET_TASKS);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [mail, setMail] = useState(null);
  const [date, setDate] = useState(new Date());
  const [openDate, setOpen] = useState(false);

  useEffect(() => {
    const setData = () => {
      setMail(props.mail);
    };
    setData();
  }, [props.mail]);

  const [create] = useMutation(NTASK, {
    onCompleted: () => {
      console.log('Успешно создан');
    },
    onError: ({message}) => {
      console.log(message);
    },
  });
  const createTask = () => {
    create({
      variables: {
        title,
        description,
        mail,
        date,
      },
      onCompleted: refetch,
    });
  };

  const createHandle = () =>
    Alert.alert('', 'Create new task?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => createTask(new Date().getTime())},
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
                }}
                placeholder="Заголовок"
              />
            </View>
            <View style={styles.textBoxDes}>
              <TextInput
                style={styles.textBoxText}
                multiline={true}
                onChangeText={text => {
                  setDescription(text);
                }}
                placeholder="Описание"
              />
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
            <View style={styles.label}>
              <TouchableOpacity
                onPress={() => {
                  createHandle();
                }}>
                <Text style={styles.labelText}>+ Add task</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.label}>
              <TouchableOpacity
                onPress={() => {
                  onClose();
                }}>
                <Text style={styles.labelText}>Close</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
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
    </Modal>
  );
};

export default ModalActivity;
