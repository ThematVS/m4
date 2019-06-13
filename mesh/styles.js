import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const MAX_SIZE = Math.round(Math.sqrt(windowHeight * windowHeight + windowWidth * windowWidth))

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: MAX_SIZE,
    height: MAX_SIZE,
  },
});
