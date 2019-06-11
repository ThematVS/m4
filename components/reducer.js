import * as all from './actions';
import { Alert } from 'react-native';

export const initialState = {
  mesh: [null, null, null],
  meshEnabled: [false, false, false],
  isPlaying: false,
  showSetup: false,
}

export function reducer(state, action) {
  const newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case all.TOGGLE_SETUP:
      //console.log('toggle');
      newState.showSetup = !state.showSetup
      return newState;
      break;

    case all.TOGGLE_MESH:
      newState.meshEnabled[action.index] = !newState.meshEnabled[action.index]
      return newState;
      break;

    case all.SELECT_MESH:
      const { meshName, index } = action;
      
      newState.mesh[index] = {
        name: meshName
      }
/*
      console.log('SELECT_MESH ---------------------------');
      console.log('SELECT_MESH action', action);
      console.log('SELECT_MESH newState', newState);
      */
      return newState
      break;

    case all.TOGGLE_PLAYBACK:
      newState.isPlaying = !state.isPlaying
      newState.showSetup = !newState.isPlaying
      return newState
      break;

    default:
      return initialState;
  }
}

