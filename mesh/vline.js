import React from 'react'
import { Animated } from 'react-native';
import Svg, { Defs, Pattern, Line, Path, Rect } from 'react-native-svg'
import MeshStyles from '../animation/styles';
import Transforms from '../animation/transforms';
import Animation from '../animation/animation';


const setup = {
  params: {
    patternWidth: 4,
    patternHeight: 4,
  },
  transforms: Transforms
};

const SvgComponent = props => {
  const {
    params: {
      patternWidth = setup.patternWidth,
      patternHeight = setup.patternHeight,
    },
    transforms
  } = props;

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
            <Line x1='0' y1={Math.round(patternWidth / 2)} x2={patternWidth} y2={Math.round(patternWidth / 2)} stroke='#000' />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#prefix__a)" />
      </Svg>
    </Animated.View>
  )
}

//<Path stroke="#000" d={`M${x0} ${y0}v${v}M${x1} ${y1}h${h}`} />
export default {
  name: 'Line mesh',
  description: 'Line with length and pattern size setup',
  setup,
  getMesh: (props) => SvgComponent(props),
}
