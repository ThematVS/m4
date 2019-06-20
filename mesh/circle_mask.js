import React from 'react'
import { Animated } from 'react-native';
import Svg, { Defs, Pattern, Mask, Circle, Rect } from 'react-native-svg'
import MeshStyles from '../animation/styles';
import Transforms from '../animation/transforms';
import Animation from '../animation/animation';


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

const SvgComponent = props => {
  const {
    params: {
      patternWidth = setup.patternWidth,
      patternHeight = setup.patternHeight,
      cx = setup.cx,
      cy = setup.cy,
      r = setup.r
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
