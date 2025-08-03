import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { homeStyles } from '../style/home';

interface FilmStripHolesProps {
  filmAreaAnim: Animated.Value;
  isVisible: boolean;
  side: 'left' | 'right';
  onPress?: () => void;
  holeCount?: number;
}

export default function FilmStripHoles({ 
  filmAreaAnim, 
  isVisible, 
  side, 
  onPress, 
  holeCount = 15 
}: FilmStripHolesProps) {
  if (!isVisible) return null;

  const renderHoles = () => {
    const holes = [];
    for (let i = 0; i < holeCount; i++) {
      holes.push(<View key={i} style={homeStyles.filmHole} />);
    }
    return holes;
  };

  const stripStyle = side === 'left' ? homeStyles.leftFilmStrip : homeStyles.rightFilmStrip;
  const translateDirection = side === 'left' ? -50 : 50;

  const AnimatedComponent = onPress ? Animated.View : Animated.View;

  return (
    <AnimatedComponent 
      style={[
        stripStyle,
        {
          position: 'absolute',
          [side]: 0,
          top: 0,
          bottom: 0,
          opacity: filmAreaAnim,
          transform: [
            {
              translateX: filmAreaAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [translateDirection, 0],
              })
            }
          ]
        }
      ]}
    >
      {onPress ? (
        <TouchableOpacity 
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          onPress={onPress}
        >
          {renderHoles()}
        </TouchableOpacity>
      ) : (
        renderHoles()
      )}
    </AnimatedComponent>
  );
}