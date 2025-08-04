import { homeStyles } from "../../style/home";
import { commonStyles, spacing } from "../../style/theme";
import { View, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { UploadedImage } from "./UploadedImage";
import { TextItem } from "./TextItem";
import { CounterItem } from "./CounterItem";
import { FilmItem } from "../../types/filmItems";
import { BackgroundConfig } from "./BackgroundColorModal";

interface CurrentFilmProps {
  toggleEditMode: () => void;
  isEditMode: boolean;
  filmItems: FilmItem[];
  selectedItemId?: string | null;
  onSelectItem?: (itemId: string) => void;
  onUpdateItemTransform?: (itemId: string, transform: any) => void;
  backgroundConfig?: BackgroundConfig;
}

export const CurrentFilm = ({
  toggleEditMode,
  isEditMode,
  filmItems,
  selectedItemId,
  onSelectItem,
  onUpdateItemTransform,
  backgroundConfig,
}: CurrentFilmProps) => {

  const getBackgroundStyle = () => {
    if (backgroundConfig?.type === 'gradient' && backgroundConfig.colors.length >= 2) {
      return {
        borderColor: "red",
        borderWidth: 1,
      };
    } else {
      return {
        backgroundColor: backgroundConfig?.colors?.[0] || "white",
        borderColor: "red",
        borderWidth: 1,
      };
    }
  };

  const renderBackground = () => {
    if (backgroundConfig?.type === 'gradient' && backgroundConfig.colors.length >= 2) {
      return (
        <LinearGradient
          colors={backgroundConfig.colors as [string, string, ...string[]]}
          start={
            backgroundConfig.direction === 'horizontal' ? [0, 0.5] :
            backgroundConfig.direction === 'vertical' ? [0.5, 0] :
            [0, 0]
          }
          end={
            backgroundConfig.direction === 'horizontal' ? [1, 0.5] :
            backgroundConfig.direction === 'vertical' ? [0.5, 1] :
            [1, 1]
          }
          style={[homeStyles.container, getBackgroundStyle()]}
        >
          {renderContent()}
        </LinearGradient>
      );
    } else {
      return (
        <View style={[homeStyles.container, getBackgroundStyle()]}>
          {renderContent()}
        </View>
      );
    }
  };

  const renderContent = () => (
    <>
      {filmItems.map((item) => {
        if (item.type === 'image') {
          return (
            <UploadedImage
              key={item.id}
              item={item}
              isEditMode={isEditMode}
              isSelected={selectedItemId === item.id}
              onSelect={() => onSelectItem?.(item.id)}
              onUpdateTransform={(transform) => onUpdateItemTransform?.(item.id, transform)}
            />
          );
        } else if (item.type === 'text') {
          return (
            <TextItem
              key={item.id}
              item={item}
              isEditMode={isEditMode}
              isSelected={selectedItemId === item.id}
              onSelect={() => onSelectItem?.(item.id)}
              onUpdateTransform={(transform) => onUpdateItemTransform?.(item.id, transform)}
            />
          );
        } else if (item.type === 'counter') {
          return (
            <CounterItem
              key={item.id}
              item={item}
              isEditMode={isEditMode}
              isSelected={selectedItemId === item.id}
              onSelect={() => onSelectItem?.(item.id)}
              onUpdateTransform={(transform) => onUpdateItemTransform?.(item.id, transform)}
            />
          );
        }
        return null;
      })}
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
    </>
  );

  return renderBackground();
};
