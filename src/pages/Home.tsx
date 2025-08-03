import React, { useState, useRef } from "react";
import { View, TouchableOpacity, SafeAreaView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../style/theme";
import { homeStyles } from "../style/home";

import Toolbox from "../components/Toolbox";
import CurrentFilm from "../components/CurrentFilm";
import PreviousFilm from "../components/PreviousFilm";
import NextFilm from "../components/NextFilm";
import FilmStripHoles from "../components/FilmStripHoles";

type ViewMode = "default" | "editMode";

export default function Home() {
  const [mode, setMode] = useState<ViewMode>("default");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const toolboxAnim = useRef(new Animated.Value(0)).current;
  const filmAreaAnim = useRef(new Animated.Value(0)).current;
  const positionAnim = useRef(new Animated.Value(0)).current;

  const toggleMode = () => {
    const newMode = mode === "default" ? "editMode" : "default";

    if (newMode === "editMode") {
      // Animate to edit mode
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(toolboxAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(filmAreaAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate to default mode
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(toolboxAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(filmAreaAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(positionAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }

    setMode(newMode);
  };

  const handleAddNewFilm = () => {
    // Handle adding new film logic
    console.log("Add new film");
  };

  const handleFilmStripSlider = () => {
    // Handle film strip slider logic
    console.log("Film strip slider pressed");
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: mode === "editMode" ? "row" : "column",
        }}
      >
        {/* Toolbox Component */}
        <Toolbox
          onToggleMode={toggleMode}
          toolboxAnim={toolboxAnim}
          isVisible={mode === "editMode"}
        />

        {/* Main Content Area */}
        <Animated.View
          style={[
            { flex: 1 },
            {
              backgroundColor: positionAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["#000000", "#C0C0C0"],
              }),
            },
          ]}
        >
          {/* Previous Film Component */}
          <PreviousFilm
            filmAreaAnim={filmAreaAnim}
            isVisible={mode === "editMode"}
          />

          {/* Central Content Area */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {/* Film Strip Holes Components */}
            <FilmStripHoles
              filmAreaAnim={filmAreaAnim}
              isVisible={mode === "editMode"}
              side="left"
            />

            <FilmStripHoles
              filmAreaAnim={filmAreaAnim}
              isVisible={mode === "editMode"}
              side="right"
              onPress={handleFilmStripSlider}
            />

            {/* Current Film Component */}
            <CurrentFilm
              scaleAnim={scaleAnim}
              isEditMode={mode === "editMode"}
            />
          </View>

          {/* Next Film Component */}
          <NextFilm
            filmAreaAnim={filmAreaAnim}
            isVisible={mode === "editMode"}
            onAddNewFilm={handleAddNewFilm}
          />
        </Animated.View>

        {/* Mode Toggle Button - only visible in default mode */}
        {mode === "default" && (
          <TouchableOpacity style={homeStyles.modeToggle} onPress={toggleMode}>
            <Ionicons name="create" size={18} color={colors.background} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
