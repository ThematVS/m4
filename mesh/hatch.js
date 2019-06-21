import React from 'react'
import { Animated } from 'react-native';
import Svg, { Defs, Pattern, Path, Rect } from 'react-native-svg'
import MeshStyles from '../animation/styles';
import Transforms from '../animation/transforms';
import Animation from '../animation/animation';


const setup = {
  params: {
    patternWidth: 4,
    patternHeight: 4,
    rot: 45,
  },
  transforms: Transforms,
}

const SvgComponent = props => {
  const {
    params: {
      patternWidth = setup.patternWidth,
      patternHeight = setup.patternHeight,
      rot = setup.rot,
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
            patternTransform={`rotate(${rot})`}
          >
            <Path stroke="#000" d="M2 0v4M0 2h4" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#prefix__a)" />
      </Svg>
    </Animated.View>
  )
}

export default {
  name: 'Hatch mesh',
  description: 'Simple hatch',
  setup,
  getMesh: props => SvgComponent(props)
};
