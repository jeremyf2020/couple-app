import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import TabNavigation from './src/components/TabNavigation';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <TabNavigation />
      <StatusBar style="light" />
    </View>
  );
}
