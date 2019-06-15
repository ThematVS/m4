import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { reducer, initialState, forcedState } from './components/reducer';
import AppContext from './components/AppContext';
import Player from './components/Player'
import Setup from './components/Setup';

export default function App() {
  //const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useReducer(reducer, forcedState);

  return (
    <View style={styles.container}>
      <AppContext.Provider value={{ state, dispatch }}>
        <Player />
        <Setup />
      </AppContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
});
