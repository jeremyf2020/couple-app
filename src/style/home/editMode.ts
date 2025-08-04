import { StyleSheet } from "react-native";
import { colors, spacing, dimensions, margins, animations } from "../theme";

export const toolboxWidth = spacing.xxl + margins.md;

export const stripsHolesWidth =
  (dimensions.screenWidth * (1 - animations.editModeScale) - toolboxWidth) / 2;

export const editModeStyles = StyleSheet.create({
  toolbox: {
    width: toolboxWidth,
    borderColor: colors.border,
    borderWidth: 1,
    backgroundColor: colors.surface,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toolboxInner: {
    height: `${animations.editModeScale * 100}%`,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },
  toolboxButtons: {
    flex: 1,
    alignItems: "center",
  },
  toolboxButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    width: spacing.xl,
    height: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
  saveButton: {
    backgroundColor: colors.accent,
    borderRadius: spacing.sm,
    width: spacing.xl,
    height: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.sm,
    marginBottom: spacing.md,
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
