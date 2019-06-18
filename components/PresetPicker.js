import React, { useContext } from 'react'
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
  Text,
  Picker
} from 'react-native'
import AppContext from './AppContext'
import * as FileSystem from 'expo-file-system'
import presets from '../mesh/presets.json'
import FLAGS from './flags'


export default function ({ onSelect }) {
  const { state, dispatch } = useContext(AppContext)

  const handleSelectPreset = (presetName) => {
    presetName && onSelect && onSelect(presets.find((preset) => preset.name === presetName))
  }

  const listPresets = () => {
    const options = [{ label: 'Select preset...', value: null }]

    presets.map((preset) => {
      options.push({
        label: preset.name,
        value: preset.name
      });
    })
    return options
  }

  return (
    <Picker
      selectedValue={state.presetSelected || null}
      onValueChange={(presetName, index) => handleSelectPreset(presetName)}
      mode="dialog"
      style={styles.border}
      itemStyle={[{ height: 15 }]}
      itemTextStyle={[{ fontSize: 8 }]}
      textStyle={[{ fontSize: 8 }]}
    >
      {listPresets().map((el, i) => (
        <Picker.Item
          key={el.label}
          label={el.label}
          value={el.value}
        />
      ))}
    </Picker>
  )
}

const styles = StyleSheet.create({
  border: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: FLAGS.enableBorders && 3,
    width: 'auto',
    maxWidth: '45%',
    height: 20,
  },
})
