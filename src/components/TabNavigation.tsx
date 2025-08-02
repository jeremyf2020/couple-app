import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { navigationStyles } from '../style/navigation';
import { colors } from '../style/theme';

import Home from '../pages/Home';
import Todo from '../pages/Todo';
import Chat from '../pages/Chat';
import Path from '../pages/Path';
import Settings from '../pages/Settings';

type TabType = 'home' | 'todo' | 'chat' | 'path' | 'settings';

const tabs = [
  { key: 'home' as TabType, label: 'Home', component: Home, icon: 'home' as keyof typeof Ionicons.glyphMap },
  { key: 'todo' as TabType, label: 'Todo', component: Todo, icon: 'checkbox' as keyof typeof Ionicons.glyphMap },
  { key: 'chat' as TabType, label: 'Chat', component: Chat, icon: 'chatbubbles' as keyof typeof Ionicons.glyphMap },
  { key: 'path' as TabType, label: 'Path', component: Path, icon: 'map' as keyof typeof Ionicons.glyphMap },
  { key: 'settings' as TabType, label: 'Settings', component: Settings, icon: 'settings' as keyof typeof Ionicons.glyphMap },
];

export default function TabNavigation() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component || Home;

  return (
    <View style={navigationStyles.container}>
      <View style={navigationStyles.content}>
        <ActiveComponent />
      </View>
      
      <View style={navigationStyles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              navigationStyles.tab,
              activeTab === tab.key && navigationStyles.activeTab
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <View style={navigationStyles.tabContent}>
              <Ionicons
                name={tab.icon}
                size={20}
                color={activeTab === tab.key ? colors.primary : colors.text.secondary}
              />
              <Text
                style={[
                  navigationStyles.tabText,
                  activeTab === tab.key && navigationStyles.activeTabText
                ]}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}