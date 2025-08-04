import React, { useRef, useEffect, useState } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { CounterItem as CounterItemType } from "../../types/filmItems";

interface CounterItemProps {
  item: CounterItemType;
  isEditMode: boolean;
  isSelected: boolean;
  onSelect?: () => void;
  onUpdateTransform?: (transform: any) => void;
}

export const CounterItem = ({ item, isEditMode, isSelected, onSelect, onUpdateTransform }: CounterItemProps) => {
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

  // Calculate days difference
  const [daysDifference, setDaysDifference] = useState(0);

  useEffect(() => {
    const calculateDays = () => {
      const today = new Date();
      const targetDate = new Date(item.targetDate);
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysDifference(diffDays);
    };

    calculateDays();
    // Update every day
    const interval = setInterval(calculateDays, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [item.targetDate]);

  // Update animated values when item transform changes from external source (only on mount/load)
  React.useEffect(() => {
    console.log(`[${item.id}] Counter initial transform setup:`, item.transform);
    
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

  const panGesture = Gesture.Pan()
    .onStart(() => {
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
      const finalX = baseTranslateX.current + event.translationX;
      const finalY = baseTranslateY.current + event.translationY;
      
      const newTransform = {
        translateX: finalX,
        translateY: finalY,
        scale: baseScale.current,
        rotation: baseRotation.current,
      };
      
      onUpdateTransform?.(newTransform);
      baseTranslateX.current = finalX;
      baseTranslateY.current = finalY;
    });

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      scale.setValue(baseScale.current);
    })
    .onUpdate((event) => {
      const newScale = baseScale.current * event.scale;
      const clampedScale = Math.max(0.5, Math.min(3, newScale));
      scale.setValue(clampedScale);
    })
    .onEnd((event) => {
      const finalScale = Math.max(0.5, Math.min(3, baseScale.current * event.scale));
      
      const newTransform = {
        translateX: baseTranslateX.current,
        translateY: baseTranslateY.current,
        scale: finalScale,
        rotation: baseRotation.current,
      };
      
      onUpdateTransform?.(newTransform);
      baseScale.current = finalScale;
    });

  const rotationGesture = Gesture.Rotation()
    .onStart(() => {
      rotate.setValue(baseRotation.current);
    })
    .onUpdate((event) => {
      const newRotation = baseRotation.current + event.rotation;
      rotate.setValue(newRotation);
    })
    .onEnd((event) => {
      const finalRotation = baseRotation.current + event.rotation;
      
      const newTransform = {
        translateX: baseTranslateX.current,
        translateY: baseTranslateY.current,
        scale: baseScale.current,
        rotation: finalRotation,
      };
      
      onUpdateTransform?.(newTransform);
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

  const baseContainerStyle = {
    position: "absolute" as const,
    top: "50%" as const,
    left: "50%" as const,
    marginTop: -60,
    marginLeft: -120,
    minWidth: 240,
    minHeight: 120,
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

  const containerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minHeight: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  };

  const titleStyle = {
    fontSize: item.fontSize,
    color: item.color,
    fontFamily: item.fontFamily,
    textAlign: "center" as const,
    marginBottom: 8,
    fontWeight: "600" as const,
  };

  const counterStyle = {
    fontSize: item.fontSize + 4,
    color: item.color,
    fontFamily: item.fontFamily,
    textAlign: "center" as const,
    fontWeight: "bold" as const,
  };

  const getDaysText = () => {
    const absDays = Math.abs(daysDifference);
    if (daysDifference > 0) {
      return `${absDays} days left`;
    } else if (daysDifference < 0) {
      return `${absDays} days ago`;
    } else {
      return "Today!";
    }
  };

  if (!isEditMode) {
    return (
      <View style={baseContainerStyle}>
        <Animated.View style={animatedStyle}>
          <View style={containerStyle}>
            <Text style={titleStyle}>
              {item.title}
            </Text>
            <Text style={counterStyle}>
              {getDaysText()}
            </Text>
          </View>
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
            <View style={containerStyle}>
              <Text style={titleStyle}>
                {item.title}
              </Text>
              <Text style={counterStyle}>
                {getDaysText()}
              </Text>
            </View>
            <View style={frameStyle} />
          </Animated.View>
        </GestureDetector>
      </TouchableOpacity>
    </View>
  );
};