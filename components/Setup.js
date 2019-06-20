import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  ScrollView
} from 'react-native';
import { ListItem, Button, Text, Input } from 'react-native-elements'
import DialogInput from 'react-native-dialog-input'
const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
import AppContext from './AppContext'
import * as action from './actions'
import MeshPicker from './MeshPicker'
import PresetPicker from './PresetPicker'
import ParamsSetup from './ParamsSetup'
import TransformsSetup from './TransformsSetup'
import FLAGS from './flags'
import Icon from 'react-native-vector-icons'

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

  const toggleInputName = () => {
    dispatch({ type: action.TOGGLE_INPUT_NAME });
  }

  const togglePlayback = () => {
    dispatch({ type: action.TOGGLE_PLAYBACK });
  };

  const loadPreset = (setup) => {
    console.log('setup', setup);
    
    dispatch({ type: action.LOAD_PRESET, setup });
  }

  const savePreset = () => {
    //if (!state.presetSelected) {
      toggleInputName()
    //}
    //dispatch({ type: action.SAVE_PRESET });
  }

  const setNewPresetName = (presetName) => {
    dispatch({ type: action.SET_PRESET_NAME, presetName });
    dispatch({ type: action.TOGGLE_INPUT_NAME });
  }

  /**
   * Form mesh params sheet
   */
  const getMeshSetup = (i) => {
    return (
      <View style={[styles.border, styles.meshParamsTransformsContainer]}>
        <ParamsSetup meshIndex={i} />
        <TransformsSetup meshIndex={i} />
      </View>
    );
  }

  const getMeshSetupView = (i) => {
    return (
      <View style={[styles.meshSetupContainer]}>
        <MeshPicker meshIndex={i} />

        {state.mesh[i]
          ? getMeshSetup(i)
          : null
        }
      </View>
    );
  }

  const getMeshDescription = (i) => {
    return state.mesh[i].description;
  }

  const styleArrow = state.setupOpened
    ? [styles.doubleArrowDown]
    : [styles.doubleArrowUp];

  const styleList = state.setupOpened
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
        <View style={styles.setupButtonContainer}>
          <PresetPicker onSelect={(presetSetup) => loadPreset(presetSetup)} />
          <Button
            type="solid"
            raised={false}
            buttonStyle={[styles.button, styles.playButton, state.isPlaying ? styles.stopButton : null]}
            disabled={false}
            icon={{
              name: state.isPlaying ? 'stop' : 'play-arrow',
              size: 25,
              color: '#fff',
              iconStyle: styleArrow
            }}
            onPress={() => {
              togglePlayback()
            }}
          />
          <Button
            title={'Save as...'}
            type="solid"
            raised={false}
            buttonStyle={[styles.button]}
            disabled={!state.canSave}
            onPress={() => {
              savePreset()
            }}
          />

          <DialogInput isDialogVisible={state.inputNameOpened}
            title={null}
            message={'Input unique preset name'}
            hintInput={state.presetSelected || 'Preset #1'}
            initValueTextInput={state.presetSelected || 'Preset #1'}
            submitInput={(presetName) => { setNewPresetName(presetName) }}
            closeDialog={() => {
              toggleInputName()
            }}>
          </DialogInput>
        </View>
      </View>

      <View style={styles.openSetupContainer}>
        <Button
          type="clear"
          raised={true}
          buttonStyle={styles.button}
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
    borderWidth: FLAGS.enableBorders && 1
  },
  panel: {
    backgroundColor: '#fee'
  },
  openSetupContainer: {
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
    borderWidth: FLAGS.enableBorders && 1
  },
  setupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  doubleArrowDown: {},
  doubleArrowUp: {
    transform: [{ rotate: '180deg' }]
  },
  list: {
    flex: -1,
    minHeight: 0,
    overflow: 'hidden',
    borderColor: 'green',
    borderWidth: FLAGS.enableBorders && 1,
  },
  button: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  playButton: {
    backgroundColor: '#00964b',
  },
  stopButton: {
    backgroundColor: '#c02f1d',
  },
  saveButton: {
    backgroundColor: '#4388d6',
  },
  resetButton: {
    marginBottom: 5,
  },
  meshSetupContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#eee',
  },
  meshParamsTransformsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  border: {
    borderColor: 'blue',
    borderWidth: FLAGS.enableBorders && 1
  },
});
