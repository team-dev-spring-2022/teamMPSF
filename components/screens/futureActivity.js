import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import {GET_TASKS} from '../gqls/tasks/queries';
import {useQuery, useMutation} from '@apollo/client';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DTASK} from '../gqls/tasks/mutations';
import TaskActivity from './taskActivity';
import {auth} from '../../firebase';

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
  textBox: {
    height: 40,
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
});

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const FutureActivity = () => {
  const {loading, error, data, refetch} = useQuery(GET_TASKS);
  const [openTask, setOpenTask] = useState(false);
  const [checked, setCheck] = useState(new Array(999).fill(false));
  const [mail, setMail] = useState(null);
  const [title, setTile] = useState(null);
  const [description, setDescription] = useState(null);
  const [taskId, setId] = useState(null);
  const [date, setDate] = useState(null);
  const [stext, setText] = useState('');

  const [del] = useMutation(DTASK, {
    onCompleted: () => {
      console.log('?????????????? ????????????');
    },
    onError: ({message}) => {
      console.log(message);
    },
  });

  const deleteTask = id => {
    del({
      variables: {
        id,
      },
      onCompleted: refetch,
    });
  };

  const deleteHandle = id =>
    Alert.alert('', 'Delete this task?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => deleteTask(id)},
    ]);

  useEffect(() => {
    setMail(auth.currentUser?.email);
  }, []);

  const handleOnChange = position => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item,
    );

    setCheck(updatedCheckedState);
  };
  if (loading) {
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Future</Text>
        <ScrollView>
          <Text style={styles.buttonText}>Loading</Text>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Future</Text>
      <View style={styles.textBox}>
        <TextInput
          style={styles.textBoxText}
          placeholder="??????????"
          onChangeText={text => {
            setText(text);
          }}
        />
      </View>
      <ScrollView>
        {data.tasks
          .filter(item => item.mail === mail)
          .filter(
            item =>
              item.title.includes(stext) || item.description.includes(stext),
          )
          .filter(
            item =>
              !isToday(new Date(item.date)) && new Date(item.date) > new Date(),
          )
          .sort((a, b) => new Date(a.date) > new Date(b.date))
          .map((item, index) => {
            return (
              <View key={item.id} style={styles.checkBox}>
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
                <Text
                  style={styles.checkBoxText}
                  onPress={() => {
                    setTile(item.title);
                    setDescription(item.description);
                    setId(item.id);
                    setDate(item.date);
                    setOpenTask(!openTask);
                  }}>
                  {' ' + item.title + ' ' + item.description}
                </Text>
                <MaterialCommunityIcons
                  name="minus-box"
                  color={'black'}
                  size={20}
                  onPress={() => {
                    deleteHandle(item.id);
                  }}
                />
              </View>
            );
          })}
      </ScrollView>
      <TaskActivity
        props={{taskId, description, title, date}}
        open={openTask}
        onClose={() => {
          setOpenTask(!openTask);
        }}
      />
    </View>
  );
};

export default FutureActivity;
