import React, { useContext } from 'react';
import {
  StyleSheet,
  //Text,
  View,
  Alert,
  Dimensions,
  ScrollView,
  Animated,
  Picker
//  Image
} from 'react-native';
import { ListItem, Button, Text, Input } from 'react-native-elements';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from './AppContext';
import * as action from './actions';
import Mesh from '../mesh/index';
import Icon from 'react-native-vector-icons';

console.log('Mesh', Mesh)


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

export default function Setup() {
  const { state, dispatch } = useContext(AppContext);

  const toggleSetup = () => {
    dispatch({ type: action.TOGGLE_SETUP });
  }

  const toggleEnableMesh = (index) => {
    dispatch({ type: action.TOGGLE_ENABLE_MESH, index });
  };
  const toggleOpenMesh = (index) => {
    dispatch({ type: action.TOGGLE_OPEN_MESH_SETUP, index });
  };
  
  const togglePlayback = () => {
    dispatch({ type: action.TOGGLE_PLAYBACK });
  };

  const handleSelectMeshType = (meshIndex, meshName) => {
    //console.log('Option selected:', meshName);
    if (!meshName) {
      return;
    }
    dispatch({ type: action.SELECT_MESH_TYPE, meshName, index: meshIndex });
  };

  const setMeshParam = (index, param, value) => {
    dispatch({ type: action.SET_MESH_PARAM, index, param, value })
  }

  const setMeshTransform = (index, param, value) => {
    dispatch({ type: action.SET_MESH_TRANSFORM, index, param, value })
  }

  const resetMeshParam = (index) => {
    dispatch({ type: action.RESET_MESH_PARAM, index })
  }

  const getMeshPicker = (meshIndex) => {
    //console.log('getMeshPicker --------------------------------');
    //console.log(i, state.mesh)
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

  const getMeshParams = (i) => {
    const setup = state.mesh[i]['setup'].params;

    return (
      <View style={{
        flex: 1,
        maxWidth: '50%',
        width: 'auto'
      }}
      >
        {Object.keys(setup).map(prop => (
          <View
            key={String(i + prop)}
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
              onChangeText={(value) => { setMeshParam(i, prop, value) }}
            />
          </View>
        ))}
      </View>
    );
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
            iconStyle: styleArrow
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
            iconStyle: styleArrow
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
            iconStyle: styleArrow
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

  const getMeshTransforms = (i) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          margin: 'auto',
          width: 'auto',
          maxWidth: '50%',
        }}
      >
        {rotateView(i)}
        {scaleView(i)}
        {skewXView(i)}
        {skewYView(i)}
      </View>
    );
  }
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
  /**
   * Form mesh params sheet
   */
  const getMeshSetup = (i) => {
    return (
      <View style={[styles.border, {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: 'auto',
      }]}>
        <View style={[styles.border, {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingLeft: 20,
          paddingRight: 20
        }]}>
          {getMeshParams(i)}
          {getMeshTransforms(i)}
        </View>

        <Button
          title="Reset"
          type="clear"
          raised={true}
          buttonStyle={styles.resetButton}
          disabled={false}
          onPress={() => {
            resetMeshParam(i);
          }}
        />
      </View>
    );
  }

  const getMeshSetupView = (i) => {
    return (
      <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}>
        {getMeshPicker(i)}

        {state.mesh[i]
          ? getMeshSetup(i)
          : null
        }
      </View>
    );
  }

  const getMeshDescription = (i) => {
    console.log('state.mesh[i]', state.mesh[i])
    return state.mesh[i].description;
  }

  const styleArrow = state.showSetup
    ? [styles.doubleArrowDown]
    : [styles.doubleArrowUp];

  const styleList = state.showSetup
    ? [styles.list, { height: 'auto' }]
    : [styles.list, { height: 0 }];

  return (
    <View style={[styles.container]}>
      <View style={styleList}>
        {state.mesh.map((l, i) => (
          <View key={i}>
            <ListItem
              key={'mesh' + i}
              leftIcon={{
                name: state.meshEnabled[i] ? 'grid-on' : 'grid-off',
                size: 25,
                color: '#000',
              }}
              chevron={{
                name: state.meshOpened[i] ? 'expand-more' : 'chevron-right',
                size: 25,
                color: '#aaa'
              }}
              title={l ? l.name : 'No mesh selected'}
              subtitle={l ? getMeshDescription(i) : null}
              switch={{
                disabled: false,
                onValueChange: () => {
                  toggleEnableMesh(i);
                },
                value: state.meshEnabled[i]
              }}
              onPress={() => {
                toggleOpenMesh(i);
              }}
            />
            {state.meshOpened[i] ? getMeshSetupView(i) : null}
          </View>
        ))}
        <Button
          title={state.isPlaying ? 'Stop' : 'Play'}
          type="solid"
          raised={true}
          buttonStyle={state.isPlaying ? styles.stopButton : styles.playButton}
          disabled={false}
          onPress={() => {
            togglePlayback();
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          type="clear"
          raised={true}
          buttonStyle={styles.setupButton}
          icon={{
            name: 'filter-list',
            size: 25,
            color: '#4388d6',
            iconStyle: styleArrow
          }}
          onPress={() => {
            toggleSetup();
          }}
        />
      </View>
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
  panel: {
    backgroundColor: '#fee'
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
  doubleArrowDown: {},
  doubleArrowUp: {
    transform: [{ rotate: '180deg' }]
  },
  list: {
    flex: -1,
    minHeight: 0,
    borderColor: 'green',
    borderWidth: 1,
    overflow: 'hidden'
  },
  setupButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  playButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#4388d6',
  },
  stopButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'red',
  },
  resetButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  border: {
    borderColor: 'blue',
    borderWidth: 1
  },
});
