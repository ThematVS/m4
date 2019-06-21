import React from 'react'
import { Animated } from 'react-native';
import Svg, { Defs, Pattern, Path, Circle, Rect } from 'react-native-svg'
import MeshStyles from '../animation/styles';
import Transforms from '../animation/transforms';
import Animation from '../animation/animation';


const setup = {
  params: {
    patternWidth: 4,
    patternHeight: 4,
  },
  transforms: Transforms,
}

const SvgComponent = props => {
  const {
    params: {
      patternWidth = setup.patternWidth,
      patternHeight = setup.patternHeight,
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
            <Rect x="0" y="0" width="2" height="2" fill="#000" />
            <Rect
              x="0"
              y="0"
              width={Math.round(patternWidth / 2)}
              height={Math.round(patternHeight / 2)}
              fill="#000"
            />
            <Rect
              x={Math.round(patternWidth / 2)}
              y={Math.round(patternHeight / 2)}
              width={Math.round(patternWidth / 2)}
              height={Math.round(patternHeight / 2)}
              fill="#000"
            />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#prefix__a)" />
      </Svg>
    </Animated.View>
  );
}
    ;
export default {
  name: 'Checkers',
  description: 'Tiny checkers',
  setup,
  getMesh: props => SvgComponent(props)
};
