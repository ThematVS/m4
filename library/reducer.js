import * as all from './actions';
import Mesh from '../animation/index';
import presets from '../animation/presets.json'
import { store, read } from '../library/storage'
import { Alert } from 'react-native';

export const initialState = {
  mesh: [null, null, null],
  meshEnabled: [false, false, false],
  meshOpened: [false, false, false],
  canSave: false,  // if at least one mesh set up
  canPlay: false,  // if at least one mesh active
  canDelete: false,  // if no preset selected or not a demo preset
  isPlaying: false,
  setupOpened: false,
  inputNameOpened: false,
  presetSelected: null,
  foundPresets: [],
}

export const forcedState = {
  isPlaying: false,
  mesh: [
    {
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
            duration: 2,
          },
          scaleY: {
            enabled: false,
            to: 0.7,
            duration: 2,
          },
          skewX: {
            enabled: false,
            to: 20,
            duration: 2,
          },
          skewY: {
            enabled: false,
            to: 20,
            duration: 2,
          },
        },
      },
    },
    {
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
            duration: 2,
            to: 0.7,
          },
          scaleY: {
            enabled: false,
            duration: 2,
            to: 0.7,
          },
          skewX: {
            enabled: false,
            duration: 2,
            to: 20,
          },
          skewY: {
            enabled: false,
            duration: 2,
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
  setupOpened: false,
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
      newState.setupOpened = !state.setupOpened;
      return newState;
    }

    case all.TOGGLE_PLAYBACK: {
      const someEnabled = newState.meshEnabled.some((value, i) => value);

      if (someEnabled) {
        newState.isPlaying = !state.isPlaying;
        newState.setupOpened = !newState.isPlaying;
      }
      return newState;
    }

    case all.TOGGLE_ENABLE_MESH: {
      if (newState.mesh[action.index]) {
        // if this mesh selected, we can toggle it
        newState.meshEnabled[action.index] = !newState.meshEnabled[
          action.index
        ];

        const someEnabled = newState.meshEnabled.some((value, i) => value);

        newState.canPlay = someEnabled;
        // it's the last mesh that we disabled, need to stop playback
        if (!someEnabled) {
          newState.isPlaying = false;
        }
      }
      return newState;
    }

    case all.TOGGLE_OPEN_MESH_SETUP: {
      newState.meshOpened[action.index] = !newState.meshOpened[action.index];
      return newState;
    }

    case all.SELECT_MESH_TYPE: {
      const { meshName, index } = action;

      newState.mesh[index] = {
        name: meshName,
        setup: Mesh[meshName].setup,
      };
      newState.canSave = newState.mesh.some((value, i) => value !== null);

      return newState;
    }

    case all.SET_MESH_PARAM: {
      const { index, param, value } = action;

      newState.mesh[index].setup['params'][param] = value;
      return newState;
    }

    case all.SET_MESH_TRANSFORM: {
      const { index, transform, param, value } = action;

      if (transform === 'rotate' && param === 'direction') {
        // rotation buttons can be unchecked
        if (
          state.mesh[index].setup['transforms'][transform][param] === value
        ) {
          // click on selected button
          newState.mesh[index].setup['transforms'][transform][param] = null;
          newState.mesh[index].setup['transforms'][transform].enabled = false;
          return newState;
        }
      }
      newState.mesh[index].setup['transforms'][transform][param] = value;
      newState.mesh[index].setup['transforms'][transform].enabled = true;
      return newState;
    }

    case all.RESET_MESH_PARAMS: {
      const { index } = action;
      const meshName = newState.mesh[index].name;

      newState.mesh[index].setup.params = Object.assign(
        {},
        Mesh[meshName].setup.params
      );
      return newState;
    }

    case all.RESET_MESH_TRANSFORMS: {
      const { index } = action;
      const meshName = newState.mesh[index].name;

      newState.mesh[index].setup.transforms = Object.assign(
        {},
        Mesh[meshName].setup.transforms
      );
      return newState;
    }

    case all.TOGGLE_MESH_TRANSFORM: {
      const { index, transform } = action;
      const meshName = newState.mesh[index].name;
      const enabled = !newState.mesh[index].setup.transforms[transform].enabled;

      newState.mesh[index].setup.transforms[transform] = Object.assign(
        {},
        Mesh[meshName].setup.transforms[transform],
        { enabled }
      );
      return newState;
    }

    case all.TOGGLE_INPUT_NAME: {
      newState.inputNameOpened = !state.inputNameOpened;
      return newState;
    }

    case all.LOAD_PRESET: {
      const { setup } = action;

      newState.presetSelected = setup.name;
      newState.mesh = setup.mesh;
      newState.canSave = newState.mesh.some((value, i) => value !== null);
      newState.canDelete =
        newState.presetSelected &&
        newState.presetSelected !== 'Demo Preset #1';
      return newState;
    }

    case all.SAVE_PRESET: {
      const { presetName } = action;
      newState.presetSelected = presetName;

      read('presets').then(res => {
        const storedPresets = res ? JSON.parse(res) : [];

        console.log('storedPresets', storedPresets);

        const idx = storedPresets.findIndex(
          preset => preset.name === presetName
        );

        if (idx > -1) {
          // changing existing loaded preset
          storedPresets[idx].mesh = newState.mesh;
        } else {
          // save new preset
          storedPresets.push({
            name: presetName,
            mesh: newState.mesh
          });
        }
        store('presets', storedPresets);
      });

      return newState;
    }

    case all.DELETE_PRESET: {
      const { presetName } = action;
      console.log('delete preset', presetName);
      return;
      read('presets').then(res => {
        const storedPresets = res ? JSON.parse(res) : [];

        console.log('storedPresets', storedPresets);

        const idx = storedPresets.findIndex(
          preset => preset.name === presetName
        );

        if (idx > -1) {
          // changing existing loaded preset
          storedPresets[idx].mesh = newState.mesh;
          store('presets', storedPresets);
        }
      });
       return newState;
    }

    case all.LOOKUP_PRESETS: {
      const options = [{ label: 'Select preset...', value: null }];
  
      presets.map(preset => {
        options.push({
          label: preset.name,
          value: preset.name
        });
      });
      newState.foundPresets = options;
      return newState;
/*
      return read('presets').then(res => {
        const storedPresets = res ? JSON.parse(res) : [];
  
        if (storedPresets.length) {
          storedPresets.map(preset => {
            options.push({
              label: preset.name,
              value: preset.name
            });
          });
        }
        newState.foundPresets = options
        return newState
      });
      */
    }

    default: {
      //return forcedState
      //return initialState
    }
  }
}

