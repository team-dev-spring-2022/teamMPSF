import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import {API_URL} from '../../config';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = new HttpLink({
  uri: API_URL,
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Custom-Header': true,
  },
});

const authLink = setContext(async (_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: (await AsyncStorage.getItem('token')) || null,
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
