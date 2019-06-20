import React from 'react'
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';

function getRotateStyle(rotateParams) {
  const spinValue = new Animated.Value(0)

  spinValue.stopAnimation()
  spinValue.setValue(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: rotateParams.duration * 1000,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    {
      iterations: -1
    }
  ).start();

  const direction = rotateParams.direction

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', direction === 'CW' ? '360deg' : (direction === 'CCW' ? '-360deg' : '0deg')]
  })
  return spin
}

function getScaleStyle(scaleParams) {
  const scaleValue = new Animated.Value(0)

  scaleValue.stopAnimation()
  scaleValue.setValue(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: scaleParams.duration * 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: scaleParams.duration * 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }),
    ]),
    {
      iterations: -1
    }
  ).start();

  const scale = scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, parseFloat(scaleParams.to)]
  })
  return scale
}

function getSkewStyle(skewParams) {
  const skewValue = new Animated.Value(0)

  skewValue.stopAnimation()
  skewValue.setValue(0);

  Animated.loop(
    Animated.timing(skewValue, {
      toValue: 1,
      duration: skewParams.duration * 1000,
      easing: Easing.linear,
      useNativeDriver: false
    }),
    {
      iterations: -1
    }
  ).start();

  const skew = skewValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', parseFloat(skewParams.to) + 'deg']
  })
  return skew
}

function getStyles({ rotate, scaleX, scaleY, skewX, skewY }) {
  const transformStyle = []

  // create animation based on transforms
  if (rotate.enabled) {
    transformStyle.push({ rotate: getRotateStyle(rotate) })
  }

  if (scaleX.enabled) {
    transformStyle.push({ scaleX: getScaleStyle(scaleX) })
  }
  if (scaleY.enabled) {
    transformStyle.push({ scaleY: getScaleStyle(scaleY) })
  }
  // still not supported by React Native
  if (skewX.enabled) {
    transformStyle.push({ skewX: getSkewStyle(skewX) })
  }
  if (skewY.enabled) {
    transformStyle.push({ skewY: getSkewStyle(skewY) })
  }
  return transformStyle
}

export default {
  getStyles,
}
