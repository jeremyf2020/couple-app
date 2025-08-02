import { StyleSheet } from "react-native";
import { colors, spacing, typography, dimensions } from "./theme";

export const navigationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    height: dimensions.tabBarHeight,
    paddingBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xs,
    borderRadius: 8,
    marginHorizontal: spacing.xs,
  },
  activeTab: {
    backgroundColor: "transparent",
  },
  tabContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
    fontSize: 12,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: "600",
  },
});
