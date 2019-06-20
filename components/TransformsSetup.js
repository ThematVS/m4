import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions
} from 'react-native';
import { Button, Text, Input, Icon } from 'react-native-elements';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from '../library/AppContext';
import * as action from '../library/actions';
import FLAGS from '../library/flags';
//import Icon from 'react-native-vector-icons';


export default function ({ meshIndex }) {
  const { state, dispatch } = useContext(AppContext);

  const setMeshTransform = (transform, param, value) => {
    dispatch({ type: action.SET_MESH_TRANSFORM, index: meshIndex, transform, param, value })
  }
  
  const resetMeshTransforms = () => {
    dispatch({ type: action.RESET_MESH_TRANSFORMS, index: meshIndex
    })
  }

  const toggleMeshTransform = (transform) => {
    dispatch({ type: action.TOGGLE_MESH_TRANSFORM, index: meshIndex, transform })
  }

  const setup = state.mesh[meshIndex]['setup'].transforms;

  const rotateView = () => {
    const enabled = setup.rotate.enabled
    const color = enabled ? styles.enabled.color : styles.disabled.color

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
      }}
      >
        <Button
          type={setup.rotate['direction'] === 'CCW' ? 'solid' : "clear"}
          raised={false}
          icon={{
            name: 'rotate-left',
            size: 25,
            color: setup.rotate['direction'] === 'CCW' ? '#fff' : '#4388d6'
          }}
          onPress={() => {
            setMeshTransform('rotate', 'direction', 'CCW')
          }}
        />
        <Button
          type={setup.rotate['direction'] === 'CW' ? 'solid' : "clear"}
          raised={false}
          icon={{
            name: 'rotate-right',
            size: 25,
            color: setup.rotate['direction'] === 'CW' ? '#fff' : '#4388d6'
          }}
          onPress={() => {
            setMeshTransform('rotate', 'direction', 'CW')
          }}
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.rotate['duration'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('rotate', 'duration', value) }}
        />
      </View>
    )
  }

  const scaleXView = () => {
    const enabled = setup.scaleX.enabled
    const color = enabled ? styles.enabled.color : styles.disabled.color

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      >
        <Button
          containerStyle={{ flex: 0, marginRight: 10 }}
          type={enabled ? 'solid' : "clear"}
          raised={false}
          icon={{
            name: 'vibration',
            size: 25,
            color: enabled ? '#fff' : '#4388d6'
          }}
          onPress={() => {
            toggleMeshTransform('scaleX')
          }}
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.scaleX['to'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('scaleX', 'to', value) }}
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.scaleX['duration'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('scaleX', 'duration', value) }}
        />
      </View>
    )
  }

  const scaleYView = () => {
    const enabled = setup.scaleY.enabled
    const color = enabled ? styles.enabled.color : styles.disabled.color

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      >
        <Button
          containerStyle={{ flex: 0, marginRight: 10 }}
          type={enabled ? 'solid' : "clear"}
          raised={false}
          icon={{
            name: 'vibration',
            size: 25,
            color: enabled ? '#fff' : '#4388d6',
            iconStyle: { transform: [{ rotate: '90deg' }]}
          }}
          onPress={() => {
            toggleMeshTransform('scaleY')
          }}
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.scaleY['to'])}
          maxLength={3}
          keyboardType='numeric'
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('scaleY', 'to', value) }}
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.scaleY['duration'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('scaleY', 'duration', value) }}
        />
      </View>
    )
  }

  const skewXView = () => {
    const enabled = setup.skewX.enabled
    const color = enabled ? styles.enabled.color : styles.disabled.color

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      >
        <Button
          containerStyle={{ flex: 0, marginRight: 10 }}
          type={enabled ? 'solid' : "clear"}
          raised={false}
          icon={{
            name: 'swap-horiz',
            size: 25,
            color: enabled ? '#fff' : '#4388d6'
          }}
          onPress={() => {
            toggleMeshTransform('skewX')
          }}
          disabled
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.skewX['to'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('skewX', 'to', value) }}
        />
        <Text>&deg;</Text>
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.skewX['duration'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('skewX', 'duration', value) }}
        />
      </View>
    )
  }

  const skewYView = () => {
    const enabled = setup.skewY.enabled
    const color = enabled ? styles.enabled.color : styles.disabled.color

    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
      >
        <Button
          containerStyle={{ flex: 0, marginRight: 10 }}
          type={enabled ? 'solid' : "clear"}
          raised={false}
          icon={{
            name: 'swap-vert',
            size: 25,
            color: enabled ? '#fff' : '#4388d6'
          }}
          onPress={() => {
            toggleMeshTransform('skewY')
          }}
          disabled
        />
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.skewY['to'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('skewY', 'to', value) }}
        />
        <Text>&deg;</Text>
        <Input
          containerStyle={{ flex: 1, margin: 'auto' }}
          inputContainerStyle={{ paddingRight: 5 }}
          inputStyle={{ fontSize: 14, textAlign: 'right', color }}
          value={String(setup.skewY['duration'])}
          keyboardType='numeric'
          maxLength={3}
          editable={enabled}
          onChangeText={(value) => { setMeshTransform('skewY', 'duration', value) }}
        />
      </View>
    )
  }

  return (
    <View style={[styles.border, styles.container]}>
      {rotateView()}
      {scaleXView()}
      {scaleYView()}
      {skewXView()}
      {skewYView()}

      <Button
        title="Reset"
        type="clear"
        raised={true}
        buttonStyle={styles.resetButton}
        disabled={false}
        onPress={() => {
          resetMeshTransforms();
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    maxWidth: '50%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  resetButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  enabled: {
    color: '#000'
  },
  disabled: {
    color: '#aaa'
  },
  border: {
    borderColor: 'green',
    borderWidth: FLAGS.enableBorders && 1
  },
});
