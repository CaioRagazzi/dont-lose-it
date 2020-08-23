import React from 'react';
import { StyleSheet } from 'react-native';
import { Navigation } from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/item/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
