import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { CurrentFilm } from "./CurrentFilm";
import { AnimatedFilm } from "./AnimatedFilm";
import { editModeStyles } from "../../style/home/editMode";

interface EditModeProps {
  toggleEditMode: () => void;
  scaleAnim: Animated.Value;
  translateAnim: Animated.Value;
  animateDuration: number;
}

export const EditMode = ({
  toggleEditMode,
  scaleAnim,
  translateAnim,
  animateDuration,
}: EditModeProps) => {
  const toolboxOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start toolbox fade-in after 3000ms (when scaling animation completes)
    const timer = setTimeout(() => {
      Animated.timing(toolboxOpacity, {
        toValue: 1,
        duration: animateDuration,
        useNativeDriver: false,
      }).start();
    }, animateDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Animated.View
        style={[editModeStyles.toolbox, { opacity: toolboxOpacity }]}
      ></Animated.View>
      <View style={editModeStyles.filmContainer}>
        <AnimatedFilm scaleAnim={scaleAnim} translateAnim={translateAnim}>
          <CurrentFilm toggleEditMode={toggleEditMode} isEditMode={true} />
        </AnimatedFilm>
      </View>
    </>
  );
};
