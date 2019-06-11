import React from 'react'
import Svg, { Defs, Pattern, Mask, Rect } from 'react-native-svg'

const setup = {
  patternWidth: 10,
  patternHeight: 10,
  x: 2,
  y: 2,
  w: 4,
  h: 8
}

const SvgComponent = props => {
  const {
    patternWidth = setup.patternWidth,
    patternHeight = setup.patternHeight,
    x = setup.x,
    y = setup.y,
    w = setup.w,
    h = setup.h
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
  );
}

export default {
  name: 'Masked rectangle',
  description: 'Rectangle with mask',
  setup,
  getMesh: props => SvgComponent(props)
};
