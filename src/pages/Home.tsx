import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { homeStyles } from "../style/home";
import { commonStyles, spacing, dimensions, animations } from "../style/theme";
import { toolboxWidth, stripsHolesWidth } from "../style/home/editMode";
import { Ionicons } from "@expo/vector-icons";
import { CurrentFilm } from "../components/home/CurrentFilm";
import { EditMode } from "../components/home/EditMode";
import { AnimatedFilm } from "../components/home/AnimatedFilm";
import { Toolbox } from "../components/home/Toolbox";
import { FilmItem, ImageItem, TextItem, CounterItem } from "../types/filmItems";
import { saveFilmItems, loadFilmItems, saveBackgroundConfig, loadBackgroundConfig } from "../utils/filmStorage";
import { BackgroundConfig } from "../components/home/BackgroundColorModal";

export default function Home() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [filmItems, setFilmItems] = useState<FilmItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundConfig>({
    type: 'solid',
    colors: ['#FFFFFF']
  });
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const toolboxOpacity = useRef(new Animated.Value(0)).current;
  const animateDuration = 300;
  const currentFilmOffset = toolboxWidth + stripsHolesWidth;
  
  const toggleEditMode = (): void => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      // Clear selection when exiting edit mode
      setSelectedItemId(null);
    }
  };

  const addImageItem = (imageUri: string): void => {
    const newItem: ImageItem = {
      id: `image_${Date.now()}`,
      type: 'image',
      uri: imageUri,
      transform: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotation: 0,
      },
      zIndex: filmItems.length,
    };
    
    setFilmItems(prev => {
      const updated = [...prev, newItem];
      // Auto-save when new items are added
      saveFilmItems(updated).catch(error => 
        console.error("Failed to auto-save new film item:", error)
      );
      return updated;
    });
    
    setSelectedItemId(newItem.id);
  };

  const addTextItem = (text: string): void => {
    const newItem: TextItem = {
      id: `text_${Date.now()}`,
      type: 'text',
      content: text,
      fontSize: 24,
      color: '#000000',
      fontFamily: 'System',
      transform: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotation: 0,
      },
      zIndex: filmItems.length,
    };
    
    setFilmItems(prev => {
      const updated = [...prev, newItem];
      // Auto-save when new items are added
      saveFilmItems(updated).catch(error => 
        console.error("Failed to auto-save new text item:", error)
      );
      return updated;
    });
    
    setSelectedItemId(newItem.id);
  };

  const addCounterItem = (title: string, targetDate: Date): void => {
    const newItem: CounterItem = {
      id: `counter_${Date.now()}`,
      type: 'counter',
      title: title,
      targetDate: targetDate.toISOString(),
      fontSize: 20,
      color: '#000000',
      fontFamily: 'System',
      transform: {
        translateX: 0,
        translateY: 0,
        scale: 1,
        rotation: 0,
      },
      zIndex: filmItems.length,
    };
    
    setFilmItems(prev => {
      const updated = [...prev, newItem];
      // Auto-save when new items are added
      saveFilmItems(updated).catch(error => 
        console.error("Failed to auto-save new counter item:", error)
      );
      return updated;
    });
    
    setSelectedItemId(newItem.id);
  };

  const handleBackgroundChange = (background: BackgroundConfig): void => {
    setBackgroundConfig(background);
    // Save background config to device storage
    saveBackgroundConfig(background).catch(error => 
      console.error("Failed to save background config:", error)
    );
  };

  const updateItemTransform = (itemId: string, transform: Partial<ImageItem['transform']>): void => {
    console.log(`Updating transform for ${itemId}:`, transform);
    setFilmItems(prev => {
      const updated = prev.map(item => 
        item.id === itemId 
          ? { ...item, transform: { ...item.transform, ...transform } }
          : item
      );
      
      console.log("Updated film items:", updated);
      
      // Auto-save when items are transformed
      saveFilmItems(updated).catch(error => 
        console.error("Failed to auto-save film items:", error)
      );
      
      return updated;
    });
  };

  const selectItem = (itemId: string): void => {
    if (isEditMode) {
      setSelectedItemId(itemId);
    }
  };

  const handleSave = async (): Promise<void> => {
    try {
      await saveFilmItems(filmItems);
      // You could show a success message here
      console.log("Film items saved to device");
    } catch (error) {
      console.error("Failed to save film items:", error);
      // You could show an error message here
    }
  };

  // Load saved film items and background config on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Load film items
        const savedItems = await loadFilmItems();
        if (savedItems.length > 0) {
          console.log("Loading saved items:", savedItems);
          setFilmItems(savedItems);
          console.log("Loaded", savedItems.length, "film items from device");
        }

        // Load background config
        const savedBackground = await loadBackgroundConfig();
        if (savedBackground) {
          console.log("Loading saved background config:", savedBackground);
          setBackgroundConfig(savedBackground);
        }
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    };

    loadSavedData();
  }, []);

  useEffect(() => {
    /* Run both animations in parallel */
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: isEditMode ? animations.editModeScale : 1,
        duration: animateDuration,
        useNativeDriver: false,
      }),
      Animated.timing(translateAnim, {
        toValue: isEditMode ? currentFilmOffset : 0,
        duration: animateDuration,
        useNativeDriver: false,
      }),
      Animated.timing(toolboxOpacity, {
        toValue: isEditMode ? 1 : 0,
        duration: animateDuration,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isEditMode]);

  return (
    <>
      <Toolbox 
        opacity={toolboxOpacity} 
        onImageUpload={addImageItem}
        onTextAdd={addTextItem}
        onCounterAdd={addCounterItem}
        onBackgroundChange={handleBackgroundChange}
        currentBackground={backgroundConfig}
        onSave={handleSave} 
      />
      <AnimatedFilm scaleAnim={scaleAnim} translateAnim={translateAnim}>
        <CurrentFilm
          toggleEditMode={toggleEditMode}
          isEditMode={isEditMode}
          filmItems={filmItems}
          selectedItemId={selectedItemId}
          onSelectItem={selectItem}
          onUpdateItemTransform={updateItemTransform}
          backgroundConfig={backgroundConfig}
        />
      </AnimatedFilm>
    </>
  );
}
