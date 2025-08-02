import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles, typography } from '../style/theme';

export default function Chat() {
  return (
    <View style={commonStyles.centerContainer}>
      <Text style={typography.title}>Chat</Text>
      <Text style={typography.body}>Connect and communicate with your partner</Text>
    </View>
  );
}