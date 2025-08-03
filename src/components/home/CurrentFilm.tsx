import { useState } from "react";
import { homeStyles } from "../../style/home";
import { commonStyles, spacing } from "../../style/theme";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CurrentFilmProps {
  toggleEditMode: () => void;
  isEditMode: boolean;
}

export const CurrentFilm = ({
  toggleEditMode,
  isEditMode,
}: CurrentFilmProps) => {
  const [backgroundColour, setBackgroundColour] = useState("white");

  return (
    <View
      style={[
        homeStyles.container,
        {
          backgroundColor: backgroundColour,
          borderColor: "red",
          borderWidth: 1,
        },
      ]}
    >
      <TouchableOpacity
        style={[commonStyles.circleButton, homeStyles.editButton]}
        onPress={toggleEditMode}
      >
        {isEditMode ? (
          <Ionicons
            name="chevron-back-outline"
            size={spacing.md}
            color="white"
          />
        ) : (
          <Ionicons name="pencil" size={spacing.md} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};
