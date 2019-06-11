import React from 'react'
import Svg, { Defs, Pattern, Circle, Rect } from 'react-native-svg'

const setup = {
  patternWidth: 10,
  patternHeight: 10,
  cx: 5,
  cy: 5,
  r: 3,
}

const SvgComponent = props => {
  const {
    patternWidth = setup.patternWidth,
    patternHeight = setup.patternHeight,
    cx = setup.cx,
    cy = setup.cy,
    r = setup.r
  } = props;

  return (
    <Svg>
      <Defs>
        <Pattern
          id="prefix__a"
          patternUnits="userSpaceOnUse"
          width={patternWidth}
          height={patternHeight}
        >
          <Circle cx={cx} cy={cy} r={r} fill="none" />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#prefix__a)" />
    </Svg>
  )
}

export default {
  name: 'Circle',
  description: 'Circle with center and radius setup',
  setup,
  getMesh: (props) => SvgComponent(props),
}
