import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import {NTASK} from '../gqls/tasks/mutations';
import {GET_TASKS} from '../gqls/tasks/queries';
import {useMutation, useQuery} from '@apollo/client';

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

const ModalActivity = ({open, onClose, props}) => {
  const {refetch} = useQuery(GET_TASKS);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [mail, setMail] = useState(null);

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
      },
      onCompleted: refetch,
    });
  };
  return (
    <Modal visible={open} transparent={true}>
      <View style={styles.modalBack}>
        <View style={styles.modalFront}>
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
          <TouchableOpacity
            style={styles.label}
            onPress={() => {
              createTask();
            }}>
            <Text style={styles.labelText}>+ Add task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.label}
            onPress={() => {
              onClose();
            }}>
            <Text style={styles.labelText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalActivity;
