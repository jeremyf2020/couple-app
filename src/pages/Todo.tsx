import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, typography } from '../style/theme';

export default function Todo() {
  return (
    <View style={commonStyles.centerContainer}>
      <Text style={typography.title}>Todo</Text>
      <Text style={typography.body}>Manage your shared tasks together</Text>
    </View>
  );
}