import React from 'react'
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

function getRotateStyle(rotate) {
  const spinValue = new Animated.Value(0)
  spinValue.stopAnimation()
  spinValue.setValue(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: rotate.duration * 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    {
      iterations: -1
    }
  ).start();

  const direction = rotate.direction

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', direction === 'CW' ? '360deg' : (direction === 'CCW' ? '-360deg' : '0deg')]
  })

  return spin
}

function getScaleXStyle(scaleX) {
  const spinValue = new Animated.Value(0)
  spinValue.stopAnimation()
  spinValue.setValue(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: rotate.duration * 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    {
      iterations: -1
    }
  ).start();
  const direction = rotate.direction
  const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', direction === 'CW' ? '360deg' : (direction === 'CCW' ? '-360deg' : '0deg')]
  })
  return spin
}

function getStyles({ rotate, scaleX, scaleY, skewX, skewY }) {
  const transformStyle = [];
  // create animation based on transforms
  if (rotate.enabled) {
    transformStyle.push({ rotate: getRotateStyle(rotate) })
  }
  if (scaleX.enabled) {
    transformStyle.push({ rotate: getScaleXStyle(scaleX) })
  }

  return transformStyle
}

export default {
  getStyles,
}
