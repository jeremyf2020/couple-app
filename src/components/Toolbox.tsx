import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../style/theme';
import { homeStyles } from '../style/home';

interface ToolboxProps {
  onToggleMode: () => void;
  toolboxAnim: Animated.Value;
  isVisible: boolean;
}

export default function Toolbox({ onToggleMode, toolboxAnim, isVisible }: ToolboxProps) {
  if (!isVisible) return null;

  return (
    <Animated.View 
      style={[
        homeStyles.leftToolbox,
        {
          opacity: toolboxAnim,
          transform: [
            {
              translateX: toolboxAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              })
            }
          ]
        }
      ]}
    >
      <TouchableOpacity style={homeStyles.toolboxButton}>
        <Ionicons name="camera" size={24} color={colors.background} />
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.toolboxButton}>
        <Ionicons name="image" size={24} color={colors.background} />
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.toolboxButton}>
        <Ionicons name="text" size={24} color={colors.background} />
      </TouchableOpacity>
      
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={homeStyles.toolboxButton} onPress={onToggleMode}>
        <Ionicons name="arrow-back" size={24} color={colors.background} />
      </TouchableOpacity>
    </Animated.View>
  );
}