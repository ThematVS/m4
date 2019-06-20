import React from 'react'
import Svg, { Defs, Pattern, Mask, Rect } from 'react-native-svg'
import { Animated } from 'react-native';
import MeshStyles from '../animation/styles';
import Transforms from '../animation/transforms';
import Animation from '../animation/animation';


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
    params: {
      patternWidth = setup.patternWidth,
      patternHeight = setup.patternHeight,
      x = setup.x,
      y = setup.y,
      w = setup.w,
      h = setup.h
    },
    transforms
  } = props

  // create animation based on transforms
  const transformStyle = Animation.getStyles(transforms)

  return (
    <Animated.View style={[MeshStyles.container, { transform: transformStyle }]} key={String(Math.random())}>
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
