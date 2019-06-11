import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  ScrollView,
  Animated,
  Picker
//  Image
} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');
import AppContext from './AppContext';
import * as action from './actions';
import Mesh from '../mesh/index';
//import Image from 'react-native-scalable-image';
import Icon from 'react-native-vector-icons';

//console.log(Mesh)

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

  const handleSelectMesh = (meshName, index) => {
    //console.log('Option selected:', meshName);
    dispatch({ type: action.SELECT_MESH, meshName, index: index - 1 });
  };

  const getMeshDescription = () => {
  }

  const getMeshPicker = (i) => {
    //console.log('getMeshPicker --------------------------------');
    //console.log(i, state.mesh)
    return (
      <Picker
        selectedValue={(state.mesh[i] && state.mesh[i].name) || null}
        onValueChange={handleSelectMesh}
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
      <View>
        {Object.keys(setup).map(prop => (
          <ListItem key={prop}>
            <Text>{prop}</Text>
            <TextInput>{setup[prop]}</TextInput>
          </ListItem>
        ))}
      </View>
    );
  }

  const getMeshSetupView = (i) => {
//    console.log('state.mesh', state.mesh);

    return (
      <View>
        {getMeshPicker(i)}

        {state.mesh[i]
          ? getMeshParams()
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
