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

  const setMeshTransform = (index, param, value) => {
    dispatch({ type: action.SET_MESH_TRANSFORM, index, param, value })
  }

  const resetMeshTransforms = (index) => {
    dispatch({ type: action.RESET_MESH_TRANSFORMS, index })
  }
  
  const rotateView = (i) => {
    //buttonStyle = { styles.setupButton }
    console.log('rotateView');
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
      }}
      >
        <Button
          type="clear"
          raised={false}
          icon={{
            name: 'rotate-left',
            size: 25,
            color: '#4388d6',
          }}
          onPress={() => {
            setMeshTransform(i, '', '')
          }}
        />
        <Button
          type="outline"
          raised={false}
          icon={{
            name: 'rotate-right',
            size: 25,
            color: '#4388d6',
          }}
          onPress={() => {
            setMeshTransform(i, '', '')
          }}
        />
        <Input
          style={{ color: 'black', width: 30 }}
          value={'10'}
          onChangeText={(value) => { setMeshTransform(i, '', '') }}
        />
      </View>
    )
  }

  const scaleView = (i) => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
      }}
      >
        <Button
          type="clear"
          raised={false}
          icon={{
            name: 'open-with',
            size: 25,
            color: '#4388d6',
          }}
          onPress={() => {
            setMeshTransform(i, '', '')
          }}
        />
        <Text>W</Text>
        <Input
          style={{ color: 'black', width: 30 }}
          value={'10'}
          onChangeText={(value) => { setMeshTransform(i, '', '') }}
        />
        <Text>H</Text>
        <Input
          style={{ color: 'black', width: 30 }}
          value={'10'}
          onChangeText={(value) => { setMeshTransform(i, '', '') }}
        />
      </View>
    )
  }

  const skewXView = (i) => {
    return null
  }

  const skewYView = (i) => {
    return null
  }

  return (
    <View style={styles.meshTransformsContainer}>
      {rotateView(meshIndex)}
      {scaleView(meshIndex)}
      {skewXView(meshIndex)}
      {skewYView(meshIndex)}

      <Button
        title="Reset"
        type="clear"
        raised={true}
        buttonStyle={styles.resetButton}
        disabled={false}
        onPress={() => {
          resetMeshTransforms(meshIndex);
        }}
      />
    </View>
  )
  /*
    <View style={[styles.border, {
      flex: -1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: 'auto',
    }]}>
  
    </View>
  */
}


const styles = StyleSheet.create({
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
