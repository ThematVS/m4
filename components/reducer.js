import * as all from './actions';
import Mesh from '../mesh/index';
import { Alert } from 'react-native';

export const initialState = {
  mesh: [null, null, null],
  meshEnabled: [false, false, false],
  meshOpened: [false, false, false],
  isPlaying: false,
  showSetup: false,
}

export function reducer(state, action) {
  const newState = JSON.parse(JSON.stringify(state))

  const log = () => {
    console.log(action.type + ' ---------------------------');
    console.log(action.type + ' action', action);
    console.log(action.type + ' newState', newState);
  }

  switch (action.type) {

    case all.TOGGLE_SETUP: {
      //console.log('toggle');
      newState.showSetup = !state.showSetup
      return newState;
    }

    case all.TOGGLE_PLAYBACK: {
      const someEnabled = newState.meshEnabled.some((value, i) => value)

      if (someEnabled) {
        newState.isPlaying = !state.isPlaying
        newState.showSetup = !newState.isPlaying
      }
      return newState
    }

    case all.TOGGLE_ENABLE_MESH: {
      if (newState.mesh[action.index]) {
        // if this mesh selected, we can toggle it
        newState.meshEnabled[action.index] = !newState.meshEnabled[action.index]
        
        const someEnabled = newState.meshEnabled.some((value, i) => value)
        // it's the last mesh that we disabled, need to stop playback
        if (!someEnabled) {
          newState.isPlaying = false
        }
      }
      return newState;
    }

    case all.TOGGLE_OPEN_MESH_SETUP: {
      newState.meshOpened[action.index] = !newState.meshOpened[action.index]
      return newState;
    }

    case all.SELECT_MESH_TYPE: {
      const { meshName, index } = action;
      
      newState.mesh[index] = {
        name: meshName,
        setup: Mesh[meshName].setup,
        description: Mesh[meshName].description
      }
      return newState
    }

    case all.SET_MESH_PARAM: {
      const { index, param, value } = action;
    
      log()

      newState.mesh[index].setup['params'][param] = value
      return newState
    }

    case all.SET_MESH_TRANSFORM: {
      const { index, transform, param, value } = action;

      log()

      newState.mesh[index].setup['transforms'][transform][param] = value
      return newState
    }

    case all.RESET_MESH_PARAMS: {
      const { index } = action;
      const meshName = newState.mesh[index].name

      log()

      newState.mesh[index].setup.params = Object.assign({}, Mesh[meshName].setup.params)
      return newState
    }

    case all.RESET_MESH_TRANSFORMS: {
      const { index } = action;
      const meshName = newState.mesh[index].name

      log()

      newState.mesh[index].setup.transforms = Object.assign({}, Mesh[meshName].setup.transforms)
      return newState
    }

    case all.TOGGLE_MESH_TRANSFORM: {
      const { index, transform } = action;
      const meshName = newState.mesh[index].name
      const enabled = !newState.mesh[index].setup.transforms[transform].enabled

      newState.mesh[index].setup.transforms[transform] = Object.assign(
        {}, Mesh[meshName].setup.transforms[transform], { enabled }
      )
      log()
      return newState
    }

    default: {
      return initialState;
    }
  }
}

