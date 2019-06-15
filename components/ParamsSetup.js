import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  TextInput
} from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from './AppContext';
import * as action from './actions';
import FLAGS from './flags';
import Icon from 'react-native-vector-icons';


export default function ({ meshIndex }) {
  const { state, dispatch } = useContext(AppContext);

  const setMeshParam = (index, param, value) => {
    dispatch({ type: action.SET_MESH_PARAM, index, param, value })
  }

  const resetMeshParams = (index) => {
    dispatch({ type: action.RESET_MESH_PARAMS, index })
  }

  const setup = state.mesh[meshIndex]['setup'].params;

  return (
    <View style={[styles.border, styles.container]}>
      {Object.keys(setup).map(prop => (
        <View
          key={String(meshIndex + prop)}
          style={styles.paramsContainer}
        >
          <Text style={{ flex: 0 }}>{prop}</Text>
          <Input
            containerStyle={{ flex: 1, margin: 'auto' }}
            inputContainerStyle={{ paddingRight: 5 }}
            inputStyle={{ fontSize: 14, textAlign: 'right' }}
            value={String(setup[prop])}
            maxLength={3}
            onChangeText={(value) => { setMeshParam(meshIndex, prop, value) }}
          />
        </View>
      ))}
      <Button
        title="Reset"
        type="clear"
        raised={true}
        buttonStyle={styles.resetButton}
        disabled={false}
        onPress={() => {
          resetMeshParams(meshIndex);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    maxWidth: '50%',
  },
  paramsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  resetButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  border: {
    borderColor: 'magenta',
    borderWidth: FLAGS.enableBorders && 1
  },
});
