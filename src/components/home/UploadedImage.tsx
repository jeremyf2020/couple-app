import React, { useRef } from "react";
import { View, Image, Animated, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { dimensions } from "../../style/theme";
import { FilmItem, ImageItem } from "../../types/filmItems";

interface UploadedImageProps {
  item: FilmItem;
  isEditMode: boolean;
  isSelected: boolean;
  onSelect?: () => void;
  onUpdateTransform?: (transform: any) => void;
}

export const UploadedImage = ({ item, isEditMode, isSelected, onSelect, onUpdateTransform }: UploadedImageProps) => {
  // Only handle images for now
  if (item.type !== 'image') return null;
  const imageItem = item as ImageItem;

  // Initialize animated values with current transform using useRef
  const translateX = useRef(new Animated.Value(item.transform.translateX)).current;
  const translateY = useRef(new Animated.Value(item.transform.translateY)).current;
  const scale = useRef(new Animated.Value(item.transform.scale)).current;
  const rotate = useRef(new Animated.Value(item.transform.rotation)).current;

  // State to store the accumulated values - initialize with saved transform values
  const baseTranslateX = useRef(item.transform.translateX);
  const baseTranslateY = useRef(item.transform.translateY);
  const baseScale = useRef(item.transform.scale);
  const baseRotation = useRef(item.transform.rotation);

  // Update animated values when item transform changes from external source (only on mount/load)
  React.useEffect(() => {
    console.log(`[${item.id}] Initial transform setup:`, item.transform);
    
    // Set initial values
    translateX.setValue(item.transform.translateX);
    translateY.setValue(item.transform.translateY);
    scale.setValue(item.transform.scale);
    rotate.setValue(item.transform.rotation);
    
    // Set initial base refs
    baseTranslateX.current = item.transform.translateX;
    baseTranslateY.current = item.transform.translateY;
    baseScale.current = item.transform.scale;
    baseRotation.current = item.transform.rotation;
  }, [item.id]); // Only run when item ID changes (new item)

  const imageSize = dimensions.screenWidth * 0.25;

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Reset animated values to current base position at start of gesture
      translateX.setValue(baseTranslateX.current);
      translateY.setValue(baseTranslateY.current);
    })
    .onUpdate((event) => {
      const newX = baseTranslateX.current + event.translationX;
      const newY = baseTranslateY.current + event.translationY;
      translateX.setValue(newX);
      translateY.setValue(newY);
    })
    .onEnd((event) => {
      // Calculate final position
      const finalX = baseTranslateX.current + event.translationX;
      const finalY = baseTranslateY.current + event.translationY;
      
      // Save complete transform (preserving scale and rotation)
      const newTransform = {
        translateX: finalX,
        translateY: finalY,
        scale: baseScale.current,
        rotation: baseRotation.current,
      };
      
      console.log(`[${item.id}] Pan ended, saving:`, newTransform);
      onUpdateTransform?.(newTransform);
      
      // Update base values AFTER saving
      baseTranslateX.current = finalX;
      baseTranslateY.current = finalY;
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      // Reset scale to current base value at start of gesture
      scale.setValue(baseScale.current);
    })
    .onUpdate((event) => {
      const newScale = baseScale.current * event.scale;
      // Clamp scale between 0.5 and 3 to prevent too small or too large
      const clampedScale = Math.max(0.5, Math.min(3, newScale));
      scale.setValue(clampedScale);
      
      // Adjust position to keep scaling centered
      const scaleDiff = clampedScale - baseScale.current;
      const centerOffsetX = (imageSize * scaleDiff) / 2;
      const centerOffsetY = (imageSize * scaleDiff) / 2;
      
      translateX.setValue(baseTranslateX.current - centerOffsetX);
      translateY.setValue(baseTranslateY.current - centerOffsetY);
    })
    .onEnd((event) => {
      // Calculate final scale
      const finalScale = Math.max(0.5, Math.min(3, baseScale.current * event.scale));
      
      // Calculate final position after centering adjustment
      const scaleDiff = finalScale - baseScale.current;
      const centerOffsetX = (imageSize * scaleDiff) / 2;
      const centerOffsetY = (imageSize * scaleDiff) / 2;
      
      const finalX = baseTranslateX.current - centerOffsetX;
      const finalY = baseTranslateY.current - centerOffsetY;
      
      // Save complete transform with adjusted position
      const newTransform = {
        translateX: finalX,
        translateY: finalY,
        scale: finalScale,
        rotation: baseRotation.current,
      };
      
      console.log(`[${item.id}] Scale ended, saving:`, newTransform);
      onUpdateTransform?.(newTransform);
      
      // Update base values AFTER saving
      baseScale.current = finalScale;
      baseTranslateX.current = finalX;
      baseTranslateY.current = finalY;
    });

  const rotationGesture = Gesture.Rotation()
    .onStart(() => {
      // Reset rotation to current base value at start of gesture
      rotate.setValue(baseRotation.current);
    })
    .onUpdate((event) => {
      const newRotation = baseRotation.current + event.rotation;
      rotate.setValue(newRotation);
    })
    .onEnd((event) => {
      // Calculate final rotation
      const finalRotation = baseRotation.current + event.rotation;
      
      // Save complete transform (preserving position and scale)
      const newTransform = {
        translateX: baseTranslateX.current,
        translateY: baseTranslateY.current,
        scale: baseScale.current,
        rotation: finalRotation,
      };
      
      console.log(`[${item.id}] Rotation ended, saving:`, newTransform);
      onUpdateTransform?.(newTransform);
      
      // Update base value AFTER saving
      baseRotation.current = finalRotation;
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture, rotationGesture);

  const animatedStyle = {
    transform: [
      { translateX: translateX },
      { translateY: translateY },
      { scale: scale },
      { 
        rotate: rotate.interpolate({
          inputRange: [-Math.PI, Math.PI],
          outputRange: ['-180deg', '180deg']
        })
      }
    ]
  };

  // Debug log to see current values
  React.useEffect(() => {
    console.log(`[${item.id}] Current animated values:`, {
      translateX: item.transform.translateX,
      translateY: item.transform.translateY,
      scale: item.transform.scale,
      rotation: item.transform.rotation,
      isEditMode,
      isSelected
    });
  });

  const baseContainerStyle = {
    position: "absolute" as const,
    top: "50%" as const,
    left: "50%" as const,
    width: imageSize,
    height: imageSize,
    marginTop: -imageSize / 2,
    marginLeft: -imageSize / 2,
  };

  const frameStyle = {
    position: "absolute" as const,
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderWidth: (isEditMode && isSelected) ? 2 : 0,
    borderColor: (isEditMode && isSelected) ? "black" : "transparent",
    borderStyle: "dashed" as const,
    backgroundColor: (isEditMode && isSelected) ? "rgba(255, 255, 255, 0.1)" : "transparent",
    pointerEvents: "none" as const,
  };

  if (!isEditMode) {
    return (
      <View style={baseContainerStyle}>
        <Animated.View style={animatedStyle}>
          <Image 
            source={{ uri: imageItem.uri }}
            style={{ width: imageSize, height: imageSize }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }

  const handlePress = () => {
    onSelect?.();
  };

  return (
    <View style={baseContainerStyle}>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <GestureDetector gesture={isSelected ? composed : Gesture.Tap().onStart(handlePress)}>
          <Animated.View style={animatedStyle}>
            <Image 
              source={{ uri: imageItem.uri }}
              style={{ width: imageSize, height: imageSize }}
              resizeMode="contain"
            />
            <View style={frameStyle} />
          </Animated.View>
        </GestureDetector>
      </TouchableOpacity>
    </View>
  );
};