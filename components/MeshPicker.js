import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Picker
} from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from '../library/AppContext';
import * as action from '../library/actions';
import Mesh from '../mesh/index';
import FLAGS from '../library/flags';
import Icon from 'react-native-vector-icons';


const availableMeshes = (() => {
  const options = [{ label: 'Select mesh type...', value: null }];

  for (const name in Mesh) {
    //console.log(Mesh[name]);
    options.push({
      label: Mesh[name]['description'],
      value: Mesh[name]['name']
    });
  }
  //console.log('options', options);
  return options;
})()

export default function ({ meshIndex }) {
  const { state, dispatch } = useContext(AppContext);

  const handleSelectMeshType = (meshIndex, meshName) => {
    if (!meshName) {
      return;
    }
    dispatch({ type: action.SELECT_MESH_TYPE, meshName, index: meshIndex });
  };

  return (
    <Picker
      selectedValue={
        (state.mesh[meshIndex] && state.mesh[meshIndex].name) || null
      }
      onValueChange={(meshName, index) => handleSelectMeshType(meshIndex, meshName)}
      mode="dialog"
      style={styles.border}
      itemStyle={[{ height: 15 }]}
      itemTextStyle={[{ fontSize: 8 }]}
      textStyle={[{ fontSize: 8 }]}
    >
      {availableMeshes.map((el, i) => (
        <Picker.Item
          key={String(meshIndex + i)}
          label={el.label}
          value={el.value}
        />
      ))}
    </Picker>
  );
}

const styles = StyleSheet.create({
  border: {
    borderColor: 'blue',
    borderWidth: FLAGS.enableBorders && 1
  },
});
