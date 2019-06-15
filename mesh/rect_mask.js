import React from 'react'
import Svg, { Defs, Pattern, Mask, Rect } from 'react-native-svg'
import { Animated } from 'react-native';
import { Easing } from 'react-native-reanimated';
import MeshStyles from './styles';
import Transforms from './transforms';

const setup = {
  params: {
    patternWidth: 10,
    patternHeight: 10,
    x: 2,
    y: 2,
    w: 4,
    h: 8
  },
  transforms: Transforms,
}

const spinValue = new Animated.Value(0)

const SvgComponent = props => {
  const {
    patternWidth = setup.patternWidth,
    patternHeight = setup.patternHeight,
    x = setup.x,
    y = setup.y,
    w = setup.w,
    h = setup.h
  } = props;

  spinValue.stopAnimation()

  spinValue.setValue(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    {
      iterations: -1
    }
  )
  //.start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <Animated.View style={[MeshStyles.container, { transform: [{ rotate: spin }] }]} key={String(Math.random())}>
      <Svg height="100%" width="100%">
        <Defs>
          <Pattern
            id="prefix__a"
            patternUnits="userSpaceOnUse"
            width={patternWidth}
            height={patternHeight}
          >
            <Rect x={x} y={y} width={w} height={h} fill="black" />
          </Pattern>
          <Mask id="prefix__b">
            <Rect width="100%" height="100%" fill="#fff" />
            <Rect width="100%" height="100%" fill="url(#prefix__a)" />
          </Mask>
        </Defs>
        <Rect
          width="100%"
          height="100%"
          mask="url(#prefix__b)"
          fill="#151515"
        />
      </Svg>
    </Animated.View>
  );
}

export default {
  name: 'Masked rectangle',
  description: 'Rectangle with mask',
  setup,
  getMesh: props => SvgComponent(props)
};
