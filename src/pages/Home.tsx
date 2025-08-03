import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { homeStyles } from "../style/home";
import { commonStyles, spacing, dimensions, animations } from "../style/theme";
import { toolboxWidth, stripsHolesWidth } from "../style/home/editMode";
import { Ionicons } from "@expo/vector-icons";
import { CurrentFilm } from "../components/home/CurrentFilm";
import { EditMode } from "../components/home/EditMode";
import { AnimatedFilm } from "../components/home/AnimatedFilm";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const animateDuration = 300;
  const currentFilmOffset = toolboxWidth + stripsHolesWidth;
  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
  };

  console.log(currentFilmOffset);

  useEffect(() => {
    /* Run both animations in parallel */
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isEditMode ? animations.editModeScale : 1,
        duration: animateDuration,
        useNativeDriver: false,
      }),
      Animated.timing(translateAnim, {
        toValue: isEditMode ? currentFilmOffset : 0,
        duration: animateDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isEditMode]);

  return (
    <>
      {isEditMode ? (
        <EditMode
          toggleEditMode={toggleEditMode}
          scaleAnim={scaleAnim}
          translateAnim={translateAnim}
          animateDuration={animateDuration}
        />
      ) : (
        <AnimatedFilm scaleAnim={scaleAnim} translateAnim={translateAnim}>
          <CurrentFilm
            toggleEditMode={toggleEditMode}
            isEditMode={isEditMode}
          />
        </AnimatedFilm>
      )}
    </>
  );
}
