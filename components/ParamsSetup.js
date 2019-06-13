import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions
} from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from './AppContext';
import * as action from './actions';
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
    <View style={styles.meshParamsContainer}>
      {Object.keys(setup).map(prop => (
        <View
          key={String(meshIndex + prop)}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'black' }}>{prop}</Text>
          <Input
            style={{ color: 'black', margin: 'auto' }}
            value={String(setup[prop])}
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
          resetMeshParams(i);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    zIndex: 10,
    borderColor: 'red',
    borderWidth: 1
  },
  buttonContainer: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 'auto',
    borderColor: 'blue',
    borderWidth: 1
  },
  resetButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },

  meshSetupContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 'auto',
  },
  meshParamsTransformsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20
  },
  meshParamsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 'auto',
    width: 'auto',
    maxWidth: '50%',
  },
  meshTransformsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 'auto',
    width: 'auto',
    maxWidth: '50%',
  },
  border: {
    borderColor: 'blue',
    borderWidth: 1
  },
});
