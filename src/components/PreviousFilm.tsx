import React from 'react';
import { Text, Animated } from 'react-native';
import { typography } from '../style/theme';
import { homeStyles } from '../style/home';

interface PreviousFilmProps {
  filmAreaAnim: Animated.Value;
  isVisible: boolean;
}

export default function PreviousFilm({ filmAreaAnim, isVisible }: PreviousFilmProps) {
  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[
        homeStyles.topFilmArea,
        {
          opacity: filmAreaAnim,
          transform: [
            {
              translateY: filmAreaAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0],
              })
            }
          ]
        }
      ]}
    >
      <Text style={[typography.caption, { color: '#444' }]}>Previous Film</Text>
    </Animated.View>
  );
}