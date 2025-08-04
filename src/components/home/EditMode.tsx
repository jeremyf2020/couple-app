import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { CurrentFilm } from "./CurrentFilm";
import { AnimatedFilm } from "./AnimatedFilm";
import { Toolbox } from "./Toolbox";
import { editModeStyles } from "../../style/home/editMode";

interface EditModeProps {
  toggleEditMode: () => void;
  scaleAnim: Animated.Value;
  translateAnim: Animated.Value;
  animateDuration: number;
  onImageUpload: (uri: string) => void;
  filmItems: any[];
  selectedItemId: string | null;
  onSelectItem: (itemId: string) => void;
  onUpdateItemTransform: (itemId: string, transform: any) => void;
  onSave?: () => void;
}

export const EditMode = ({
  toggleEditMode,
  scaleAnim,
  translateAnim,
  animateDuration,
  onImageUpload,
  filmItems,
  selectedItemId,
  onSelectItem,
  onUpdateItemTransform,
  onSave,
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
      <Toolbox opacity={toolboxOpacity} onImageUpload={onImageUpload} onSave={onSave} />
      <View style={editModeStyles.filmContainer}>
        <AnimatedFilm scaleAnim={scaleAnim} translateAnim={translateAnim}>
          <CurrentFilm 
            toggleEditMode={toggleEditMode} 
            isEditMode={true}
            filmItems={filmItems}
            selectedItemId={selectedItemId}
            onSelectItem={onSelectItem}
            onUpdateItemTransform={onUpdateItemTransform}
          />
        </AnimatedFilm>
      </View>
    </>
  );
};
