import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const MAX_SIZE = Math.round(Math.sqrt(windowHeight * windowHeight + windowWidth * windowWidth))

// mesh style for player
export default StyleSheet.create({
  container: {
//    flexDirection: 'column',
    //alignItems: 'stretch',
    //justifyContent: 'center',
    //flex: 1,
    width: MAX_SIZE,
    height: MAX_SIZE,
    position: 'absolute',
    top: -Math.round((MAX_SIZE - windowHeight) / 2),
    left: -Math.round((MAX_SIZE - windowWidth) / 2),
  },
});
