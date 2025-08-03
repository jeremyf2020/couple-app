import { StyleSheet } from "react-native";
import { colors, spacing, dimensions, margins, animations } from "../theme";

export const toolboxWidth = spacing.xxl + margins.md;

export const stripsHolesWidth =
  (dimensions.screenWidth * (1 - animations.editModeScale) - toolboxWidth) / 2;
console.log("screenWidth", dimensions.screenWidth);
console.log("animations.editModeScale", animations.editModeScale);
console.log(
  "Reaminging",
  (dimensions.screenWidth * (1 - animations.editModeScale)) / 2
);

console.log("toolboxWidth", toolboxWidth);

console.log("stripsHolesWidth", stripsHolesWidth);

export const editModeStyles = StyleSheet.create({
  toolbox: {
    width: toolboxWidth,
    borderColor: "black",
    borderWidth: 1,
    // backgroundColor: colors.secondary,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
  stripsHoles: {
    width: stripsHolesWidth,
    backgroundColor: colors.border,
  },
  filmContainer: {
    flex: 1,
    marginLeft: 0,
  },
});
