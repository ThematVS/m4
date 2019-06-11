import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from './AppContext';
import Mesh from '../mesh/index';


export default function Player() {
  const { state, dispatch } = useContext(AppContext);

  const showMesh = () => {
    if (!state.mesh[0]) {
      return null
    }
    const meshName = state.mesh[0].name
    const setup = Mesh[meshName].setup
    console.log(setup)
    return Mesh[meshName].getMesh(setup);
  }

  return (
    <View style={styles.container}>
      {state.isPlaying ? showMesh() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
});
