import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';

const setup = {
  patternWidth: 10,
  patternHeight: 10,
  cx: 5,
  cy: 5,
  r: 3,
}

const SvgComponent = props => {
  return (
    <View style={styles.container}>
      <Svg height={100} width={100}>
        <Svg.Circle
          cx={50}
          cy={50}
          r={45}
          strokeWidth={2.5}
          stroke="#e74c3c"
          fill="#f1c40f"
        />
        <Svg.Rect
          x={15}
          y={15}
          width={70}
          height={70}
          strokeWidth={2}
          stroke="#9b59b6"
          fill="#3498db"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default {
  name: 'expo mesh',
  description: 'expo svg example',
  setup,
  getMesh: (props) => SvgComponent(props),
}