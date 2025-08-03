import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const colors = {
  primary: "#8B5CF6",
  secondary: "#EADCF2",
  background: "#FFFFFF",
  surface: "#F9F7FA",
  accent: "#C8A8D8",
  text: {
    primary: "#4A4A4A",
    secondary: "#6B6B6B",
    light: "#9E9E9E",
  },
  border: "#E8D5ED",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};

export const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const dimensions = {
  screenWidth,
  screenHeight,
  tabBarHeight: 60,
  headerHeight: 44,
};

export const animations = {
  editModeScale: 0.8,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: "bold" as "bold",
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as "600",
    color: colors.text.primary,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
  },
  caption: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  small: {
    fontSize: 12,
    color: colors.text.light,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: "center",
    marginVertical: spacing.sm,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "600",
    fontSize: 16,
  },
  circleButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.xl,
    width: spacing.xxl,
    height: spacing.xxl,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.sm,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
    backgroundColor: colors.background,
  },
});
