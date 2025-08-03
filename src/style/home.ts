import { StyleSheet } from "react-native";
import { colors, spacing, dimensions } from "./theme";

const { screenWidth, screenHeight } = dimensions;

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backgroundMode: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    backgroundColor: "#000000",
  },
  editMode: {
    flex: 1,
    backgroundColor: "#C0C0C0",
    flexDirection: "row",
  },
  leftToolbox: {
    width: screenWidth * 0.15,
    backgroundColor: "#A0A0A0",
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  toolboxButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
  },
  mainEditArea: {
    flex: 1,
    position: "relative",
  },
  topFilmArea: {
    height: screenHeight * 0.08,
    backgroundColor: "#B0B0B0",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomFilmArea: {
    height: screenHeight * 0.08,
    backgroundColor: "#B0B0B0",
    alignItems: "center",
    justifyContent: "center",
  },
  centralArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  leftFilmStrip: {
    width: screenWidth * 0.08,
    backgroundColor: "#C0C0C0",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  rightFilmStrip: {
    width: screenWidth * 0.08,
    backgroundColor: "#C0C0C0",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  filmHole: {
    width: 8,
    height: 12,
    backgroundColor: "#000000",
    marginVertical: spacing.xs,
    borderRadius: 2,
  },
  scaledDefaultMode: {
    width: screenWidth * 0.69, // Available width after toolbox and film strips
    height: (screenHeight - (screenHeight * 0.16)) * 0.8, // Available height (minus top/bottom areas) * scale
    backgroundColor: "#000000",
    borderRadius: spacing.sm,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
  },
  scaledContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
    width: "100%",
    height: "100%",
  },
  modeToggle: {
    position: "absolute",
    bottom: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  modeToggleText: {
    color: colors.background,
    fontWeight: "600",
    fontSize: 12,
  },
  lightText: {
    color: "#FFFFFF",
  },
  filmStripBorder: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: "#000000",
  },
  filmStripBorderBottom: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: "#000000",
  },
});
