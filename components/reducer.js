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

    case all.TOGGLE_ENABLE_MESH: {
      newState.meshEnabled[action.index] = !newState.meshEnabled[action.index]
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
      const { index, param, value } = action;

      log()

      newState.mesh[index].setup['transforms'][param] = value
      return newState
    }

    case all.RESET_MESH_SETUP: {
      const { index } = action;
      const meshName = newState.mesh[index].name

      log()

      newState.mesh[index].setup = Object.assign({}, Mesh[meshName].setup)
      return newState
    }

    case all.TOGGLE_PLAYBACK: {
      newState.isPlaying = !state.isPlaying
      newState.showSetup = !newState.isPlaying
      return newState
    }

    default: {
      return initialState;
    }
  }
}

