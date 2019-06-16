import React, { useContext } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
import Constants from 'expo-constants'
import AppContext from './AppContext'
import Mesh from '../mesh/index'
import FLAGS from './flags';


export default function Player() {
  const { state, dispatch } = useContext(AppContext);

  const showMesh = () => {
    return state.mesh.map((mesh, i) => {
      if (!state.mesh[i] || !state.meshEnabled[i]) { return null }

      const meshName = state.mesh[i].name
      const setup = state.mesh[i].setup

      return (
        <View style={[{ zIndex: i + 10 }]} key={String(Math.random())}>
          {Mesh[meshName].getMesh(setup)}
        </View>
      )
    })
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.meshPositioner]}>
        {state.isPlaying ? showMesh() : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  meshPositioner: {
    width: '100%',
    height: '100%',
  },
  border: {
    borderColor: 'blue',
    borderWidth: FLAGS.enableBorders && 3
  },
});
