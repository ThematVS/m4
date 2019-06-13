import React, { useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
import Constants from 'expo-constants'
import AppContext from './AppContext'
import Mesh from '../mesh/index'


export default function Player() {
  const { state, dispatch } = useContext(AppContext);

  const showMesh = () => {
    return state.mesh.map((mesh, i) => {
      if (!state.mesh[i]) { return null }

      const meshName = state.mesh[i].name
      const setup = state.mesh[i].setup['params']

      return (
        <View style={[{ zIndex: i + 10 }]} key={String(Math.random())}>
          {Mesh[meshName].getMesh(setup)}
        </View>
      )
    })
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
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 0,
    overflow: 'hidden',
    zIndex: 1
  },
});
