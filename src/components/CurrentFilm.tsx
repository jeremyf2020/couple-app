import React from 'react';
import { Text, Animated } from 'react-native';
import { typography } from '../style/theme';
import { homeStyles } from '../style/home';

interface CurrentFilmProps {
  scaleAnim: Animated.Value;
  isEditMode: boolean;
}

export default function CurrentFilm({ scaleAnim, isEditMode }: CurrentFilmProps) {
  return (
    <Animated.View 
      style={[
        isEditMode ? homeStyles.scaledDefaultMode : { flex: 1, justifyContent: 'center', alignItems: 'center' },
        {
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <Animated.View 
        style={[
          homeStyles.scaledContent,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Text style={[typography.title, homeStyles.lightText]}>Home</Text>
        <Text style={[typography.body, homeStyles.lightText]}>Welcome to your couple app!</Text>
        <Text style={[typography.caption, homeStyles.lightText, { marginTop: 20, textAlign: 'center' }]}>
          Your shared space
        </Text>
      </Animated.View>
    </Animated.View>
  );
}