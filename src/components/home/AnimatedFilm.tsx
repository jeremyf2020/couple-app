import React from "react";
import { Animated } from "react-native";

interface AnimatedFilmProps {
  scaleAnim: Animated.Value;
  translateAnim: Animated.Value;
  children: React.ReactNode;
}

export const AnimatedFilm = ({
  scaleAnim,
  translateAnim,
  children,
}: AnimatedFilmProps) => {
  return (
    <Animated.View
      style={{
        transform: [{ translateX: translateAnim }, { scale: scaleAnim }],
        flex: 1,
        transformOrigin: "left center",
      }}
    >
      {children}
    </Animated.View>
  );
};
