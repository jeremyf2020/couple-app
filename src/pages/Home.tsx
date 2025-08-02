import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, typography } from '../style/theme';

export default function Home() {
  return (
    <View style={commonStyles.centerContainer}>
      <Text style={typography.title}>Home</Text>
      <Text style={typography.body}>Welcome to your couple app!</Text>
    </View>
  );
}