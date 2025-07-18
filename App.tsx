import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // For icons

// Import your screens (we'll create these next)
import HomeScreen from "./src/screens/HomeScreen";
import TodoScreen from "./src/screens/TodoScreen";
import ChatScreen from "./src/screens/ChatScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home" // Home as default
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "ToDo") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Chat") {
              iconName = focused ? "chatbubbles" : "chatbubbles-outline";
            } else if (route.name === "Notifications") {
              iconName = focused ? "notifications" : "notifications-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue", // Color for active tab
          tabBarInactiveTintColor: "gray", // Color for inactive
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="ToDo" component={TodoScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
