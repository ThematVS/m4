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
//import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons';

console.log('Mesh', Mesh)

//const doubleArrow = require('../assets/double-arrow.png');

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
];

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

  const toggleMesh = (index) => {
    dispatch({ type: action.TOGGLE_MESH, index });
  };

  const togglePlayback = () => {
    dispatch({ type: action.TOGGLE_PLAYBACK });
  };

  const handleSelectMesh = (meshIndex, meshName) => {
    //console.log('Option selected:', meshName);
    if (!meshName) {
      return;
    }
    dispatch({ type: action.SELECT_MESH, meshName, index: meshIndex });
  };

  const getMeshDescription = () => {
  }

  const getMeshPicker = (meshIndex) => {
    //console.log('getMeshPicker --------------------------------');
    //console.log(i, state.mesh)
    return (
      <Picker
        selectedValue={
          (state.mesh[meshIndex] && state.mesh[meshIndex].name) || null
        }
        onValueChange={(meshName, index) => handleSelectMesh(meshIndex, meshName)}
        mode="dialog"
      >
        {availableMeshes.map((el, i) => (
          <Picker.Item
            key={i}
            label={el.label}
            value={el.value}
            style={{ height: 20, fontSize: 12 }}
          />
        ))}
      </Picker>
    );
  }

  const getMeshParams = (i) => {
    if (!state.mesh[i]) {
      return null
    }
    const meshName = state.mesh[i]['name'];
    const setup = Mesh[meshName]['setup'];

    return (
      <View style={{ height: 'auto', borderColor: 'cyan', borderWidth: 1 }}>
        {Object.keys(setup).map(prop => (
          <View
            key={prop}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: 'black' }}>{prop}</Text>
            <Input style={{ color: 'black', margin: 'auto' }} value={String(setup[prop])} />
          </View>
        ))}
      </View>
    );
  }

  const getMeshSetupView = (i) => {
    return (
      <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}>
        {getMeshPicker(i)}

        {state.mesh[i]
          ? getMeshParams(i)
          : null
        }
      </View>
    );
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
        {list.map((l, i) => (
          <View key={i}>
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              switch={{
                disabled: false,
                onValueChange: () => {
                  toggleMesh(i);
                },
                value: state.meshEnabled[i]
              }}
            />
            {state.meshEnabled[i] ? getMeshSetupView(i) : null}
          </View>
        ))}
        <Button
          title="Play"
          type="solid"
          raised={true}
          buttonStyle={styles.playButton}
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
          buttonStyle={styles.playButton}
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
    backgroundColor: '#eee',
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
  playButton: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 5,
    marginBottom: 5
  }
});
