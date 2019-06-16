import React from 'react'
import { Animated } from 'react-native';
import Svg, { Defs, Pattern, Mask, Circle, Rect } from 'react-native-svg'
import { Easing } from 'react-native-reanimated';
import MeshStyles from './styles';
import Transforms from './transforms';

const setup = {
  params: {
    patternWidth: 10,
    patternHeight: 10,
    cx: 5,
    cy: 5,
    r: 3,
  },
  transforms: Transforms,
}

const spinValue = new Animated.Value(0)

const SvgComponent = props => {
  console.log('svg');

  const {
    patternWidth = setup.patternWidth,
    patternHeight = setup.patternHeight,
    cx = setup.cx,
    cy = setup.cy,
    r = setup.r
  } = props;

  spinValue.stopAnimation()

  spinValue.setValue(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: true
    }),
    {
      iterations: -1
    }
  )
  .start();

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
            <Circle cx={cx} cy={cy} r={r} fill="#000" />
          </Pattern>
          <Mask id="prefix__b">
            <Rect width="100%" height="100%" fill="#fff" />
            <Rect width="100%" height="100%" fill="url(#prefix__a)" />
          </Mask>
        </Defs>
        <Rect width="100%" height="100%" mask="url(#prefix__b)" fill="#151515" />
      </Svg>
    </Animated.View>
  )
}

export default {
  name: 'Circle with mask',
  description: 'Masked circle with center and radius setup',
  setup,
  getMesh: (props) => SvgComponent(props),
}