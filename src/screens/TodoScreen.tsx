import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>To-Do List Screen - Shared Tasks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoScreen;
