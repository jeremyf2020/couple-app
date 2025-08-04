import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import TabNavigation from './src/components/TabNavigation';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabNavigation />
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}
