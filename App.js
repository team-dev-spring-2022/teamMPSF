import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './components/routers/StackNavigator';
import client from './components/utils/apollo';
import {ApolloProvider} from '@apollo/client';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
