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

export const forcedState = {
  isPlaying: false,
  mesh: [
    {
      description: "Masked circle with center and radius setup",
      name: "Circle with mask",
      setup: {
        params: {
          cx: 5,
          cy: 5,
          patternHeight: 10,
          patternWidth: 10,
          r: 3,
        },
        transforms: {
          rotate: {
            direction: "CW",
            duration: 10,
            enabled: true,
          },
          scaleX: {
            enabled: false,
            to: 0.7,
          },
          scaleY: {
            enabled: false,
            to: 0.7,
          },
          skewX: {
            enabled: false,
            to: 20,
          },
          skewY: {
            enabled: false,
            to: 20,
          },
        },
      },
    },
    {
      description: "Rectangle with mask",
      name: "Masked rectangle",
      setup: {
        params: {
          h: 8,
          patternHeight: 10,
          patternWidth: 10,
          w: 4,
          x: 2,
          y: 2,
        },
        transforms: {
          rotate: {
            direction: "CW",
            duration: 10,
            enabled: true,
          },
          scaleX: {
            enabled: false,
            to: 0.7,
          },
          scaleY: {
            enabled: false,
            to: 0.7,
          },
          skewX: {
            enabled: false,
            to: 20,
          },
          skewY: {
            enabled: false,
            to: 20,
          },
        },
      },
    },
    null,
  ],
  meshEnabled: [
    true,
    true,
    false,
  ],
  meshOpened: [
    false,
    false,
    false,
  ],
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
      //console.log('newState', newState)
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
    
      newState.mesh[index].setup['params'][param] = value
      return newState
    }

    case all.SET_MESH_TRANSFORM: {
      const { index, transform, param, value } = action;

      if (transform === 'rotate' && param === 'direction') {
        // rotation buttons can be unchecked
        if (state.mesh[index].setup['transforms'][transform][param] === value) {
          // click on selected button
          newState.mesh[index].setup['transforms'][transform][param] = null

          return newState
        }
      }
      newState.mesh[index].setup['transforms'][transform][param] = value
      return newState
    }

    case all.RESET_MESH_PARAMS: {
      const { index } = action;
      const meshName = newState.mesh[index].name

      newState.mesh[index].setup.params = Object.assign({}, Mesh[meshName].setup.params)
      return newState
    }

    case all.RESET_MESH_TRANSFORMS: {
      const { index } = action;
      const meshName = newState.mesh[index].name

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
      return newState
    }

    default: {
      //return forcedState
      //return initialState
    }
  }
}

