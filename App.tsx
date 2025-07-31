import React from "react";
import { ThemeProvider } from "./src/theme/ThemeProvider";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
