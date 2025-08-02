import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, typography } from '../style/theme';

export default function Settings() {
  return (
    <View style={commonStyles.centerContainer}>
      <Text style={typography.title}>Settings</Text>
      <Text style={typography.body}>Customize your app experience</Text>
    </View>
  );
}