import React from 'react'
import { Animated } from 'react-native';
import Svg, { Defs, Pattern, Path, Circle, Rect } from 'react-native-svg'
import MeshStyles from '../animation/styles';
import Transforms from '../animation/transforms';
import Animation from '../animation/animation';


const setup = {
  params: {
    patternWidth: 10,
    patternHeight: 10,
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
            <Path d="M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z" fill="#000" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#prefix__a)" />
      </Svg>
    </Animated.View>
  )
}

export default {
  name: 'Floor mesh',
  description: 'Floor',
  setup,
  getMesh: (props) => SvgComponent(props),
}
