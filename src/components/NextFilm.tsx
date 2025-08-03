import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import { typography } from '../style/theme';
import { homeStyles } from '../style/home';

interface NextFilmProps {
  filmAreaAnim: Animated.Value;
  isVisible: boolean;
  onAddNewFilm?: () => void;
}

export default function NextFilm({ filmAreaAnim, isVisible, onAddNewFilm }: NextFilmProps) {
  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[
        homeStyles.bottomFilmArea,
        {
          opacity: filmAreaAnim,
          transform: [
            {
              translateY: filmAreaAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity 
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        onPress={onAddNewFilm}
      >
        <Text style={[typography.caption, { color: '#444' }]}>Add New Film</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}