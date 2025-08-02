import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, typography } from '../style/theme';

export default function Path() {
  return (
    <View style={commonStyles.centerContainer}>
      <Text style={typography.title}>Path</Text>
      <Text style={typography.body}>Track your journey together</Text>
    </View>
  );
}