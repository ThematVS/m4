import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Constants, Svg } from 'expo';
import { Easing } from 'react-native-reanimated';

const setup = {
  patternWidth: 10,
  patternHeight: 10,
  cx: 5,
  cy: 5,
  r: 3,
}

const spinValue = new Animated.Value(0)

const SvgComponent = props => {
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    {
      iterations: -1
    }
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={[styles.container, { transform: [{rotate: spin}]}]}>
      <Svg height={100} width={100} >
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
    </Animated.View>
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